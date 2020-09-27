import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Button, message, Select } from 'antd';
import { useSelector } from 'react-redux';
import {
  CrossCheckSessions,
  CrossCheckSessionStates,
  Review,
  ReviewRequest,
  ReviewStates,
  Task,
  TaskItem,
  Tasks,
  TaskScore,
  TaskStates,
  User,
} from '../../Reducer/reducer';
import './TaskReview.scss';
import Header from '../Header/Header';
import Hoc from '../Hoc/Hoc';
import Service from '../../Service/Service';
import { RootState } from '../../Store/Store';
import { TaskReviewForm } from './TaskForm';
import { getTaskCategories } from './getTaskCategories';

const { Option } = Select;

export const TaskReview: React.FC = Hoc()(({ ...params }) => {
  const [task, setTask] = useState<Task>({
    name: '',
    taskId: '',
    author: '',
    state: TaskStates.DRAFT,
    categoriesOrder: [],
    subTasks: [],
  });
  const { service } = params as { service: Service };
  const [tasks, setTasks] = useState<Tasks>({});
  const user = useSelector<RootState>((state) => state.user) as User;
  const [review, setReview] = useState<Review>({
    author: String(user.userName),
    state: ReviewStates.DRAFT,
    taskScoreId: '',
    subTasks: [],
  });
  const [crossCheckSessions, setCrossCheckSessions] = useState<CrossCheckSessions>({});
  const [foundReview, setFoundReview] = useState(false);

  useEffect(() => {
    service.getAllTasks().then((response) => setTasks(response as Tasks));
    service
      .getAllCheckSessions()
      .then((allCrossCheckSessions) =>
        setCrossCheckSessions(allCrossCheckSessions as CrossCheckSessions)
      );
  }, [service]);

  const onTaskSelect = useCallback(
    (sessionId: string) => {
      setFoundReview(false);
      const taskId = crossCheckSessions[sessionId].taskId;
      const selectedTask = tasks[taskId];
      setTask(selectedTask);
      service.getReviewRequestBySessionId(sessionId).then((reviewRequest) => {
        service.getTaskScoreByRequestId((reviewRequest as ReviewRequest).id).then((taskScore) => {
          setReview({
            ...review,
            taskScoreId: String((taskScore as TaskScore).id),
            subTasks: (taskScore as TaskScore).subTasks,
          });
          service
            .getReviewByTaskScoreId(String((taskScore as TaskScore).id))
            .then((reviewFromBD) => {
              setFoundReview(true);
              setReview(reviewFromBD as Review);
            });
        });
      });
    },
    [setTask, tasks, setReview, review, crossCheckSessions, service]
  );

  const categories = getTaskCategories(task, review);
  const onScoreChange = useCallback(
    (taskId: string | number, score: number, category: string) => {
      categories[category].find((el: TaskItem) => el.id === taskId).score = score;
      setReview({
        ...review,
        subTasks: review.subTasks.map((el) => {
          if (el.id === taskId) {
            return {
              ...el,
              score,
            };
          }
          return el;
        }),
      });
    },
    [categories, setReview, review]
  );

  const onSubmit = useCallback(() => {
    if (foundReview) {
      service.putTaskReview(String(review.id), review).then(() => {
        message.success('review updated');
      });
    } else {
      service.postTaskReview(review).then(() => {
        setFoundReview(true);
        message.success('review created');
      });
    }
  }, [review, service, foundReview]);

  return (
    <div id="task-review">
      <Header />

      <Select className="task-review-select" onChange={onTaskSelect}>
        {Object.entries(crossCheckSessions)
          .filter(([key, elem]) => {
            return elem.state === CrossCheckSessionStates.CROSS_CHECK;
          })
          .map(([key, el]) => {
            return (
              <Option key={key} value={key}>
                {tasks[el.taskId].name}
              </Option>
            );
          })}
      </Select>

      <TaskReviewForm
        taskName={task.name}
        taskAuthor={task.author}
        taskState={task.state}
        categories={categories}
        onScoreChange={onScoreChange}
      />

      <Button onClick={onSubmit} type="primary">
        Submit
      </Button>
    </div>
  );
});
