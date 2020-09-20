import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import {
  Collapse,
  Comment,
  Descriptions,
  Select,
  Button,
} from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
  Review,
  ReviewStates,
  Task,
  TaskItem,
  Tasks,
  TaskScore,
  TaskStates,
  User,
} from '../Reducer/reducer';
import './TaskReview.scss';
import Header from '../Components/Header/Header';
import Hoc from '../Components/Hoc/Hoc';
import Service from '../Service/Service';
import { RootState } from '../Store/Store';
import { SetTaskScore } from './SetScore';

const { Option } = Select;
const { Panel } = Collapse;
const { Item } = Descriptions;

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
  const categories = task.subTasks.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.category]: [],
    };
  }, Object.create(null));
  Object.keys(categories).forEach((category) => {
    categories[category] = task?.subTasks.filter((item) => item.category === category);
  });
  const [tasks, setTasks] = useState<Tasks>({});

  const user = useSelector<RootState>((state) => state.user) as User;

  const [review, setReview] = useState<Review>({
    id: '',
    requestId: '',
    author: String(user.userName),
    state: ReviewStates.DRAFT,
    taskScoreId: '',
  });
  const [taskScore, setTaskScore] = useState<TaskScore>({
    id: '',
    task: '',
    items: {},
  });
  useEffect(() => {
    service.getAllTasks().then((response) => setTasks(response as Tasks));
  }, []);
  const onTaskSelect = useCallback(
    (taskId: string) => {
      const selectedTask = tasks[taskId];
      const taskScoreId = `${taskId}_taskScore`;
      setTask(selectedTask);
      setTaskScore({
        id: taskScoreId,
        task: taskId,
        items: selectedTask.subTasks.reduce((acc, cur) => {
          return {
            ...acc,
            [cur.id]: {
              score: cur.score,
              comment: '',
            },
          };
        }, Object.create(null)),
      });
      setReview({
        ...review,
        taskScoreId,
      });
    },
    [setTask, tasks, setReview, setTaskScore]
  );
  const onScoreChange = ({ id }: TaskItem) => (score: string | number | undefined) => {
    setTaskScore({
      ...taskScore,
      items: {
        ...taskScore.items,
        [id]: {
          ...taskScore.items[id],
          score: Math.max(score as number, 0),
        },
      },
    });
  };

  const history = useHistory();
  const onSubmit = useCallback(() => {
    service.postTaskReview(review);
    service.postTaskScore(taskScore);
    history.push('/');
  }, [taskScore, review]);

  return (
    <div id="task-review">
      <Header />

      <Select className="task-review-select" onChange={onTaskSelect}>
        {Object.entries(tasks)
          .filter(([key, elem]) => {
            return elem.state === TaskStates.PUBLISHED;
          })
          .map(([key, el]) => {
            return (
              <Option key={key} value={key}>
                {el.name}
              </Option>
            );
          })}
      </Select>

      <Descriptions title={task.taskId}>
        <Item label="Author">{task.author}</Item>
        <Item label="State">{task.state}</Item>
      </Descriptions>
      <Collapse>
        {Object.entries(categories).map(([category, items]) => (
          <Panel header={category} key={category}>
            {(items as TaskItem[]).map((item) => (
              <div key={item.id}>
                <Descriptions title={item.title}>
                  <Item label="Description">{item.description}</Item>
                </Descriptions>
                <SetTaskScore
                  score={taskScore.items[item.id].score}
                  maxScore={item.maxScore}
                  onChange={onScoreChange(item)}
                />
                <Comment className="task-review-comment" content="item comment" />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
      <Button onClick={onSubmit} type="primary">
        Submit
      </Button>
    </div>
  );
});
