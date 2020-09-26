import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, message } from 'antd';
import Hoc from '../Components/Hoc/Hoc';
import Service from '../Service/Service';
import { Task, TaskItem, TaskScore } from '../Reducer/reducer';
import { TaskReviewForm } from './TaskForm';
import { getTaskCategories } from './getTaskCategories';
import Header from '../Components/Header/Header';

export const SelfCheck: React.FC = Hoc()(({ service }: { service: Service }) => {
  const { taskId, reviewRequestId } = useParams();
  const [foundTaskScore, setFoundTaskScore] = useState(false);
  const [task, setTask] = useState<Task>({ subTasks: [] as TaskItem[] } as Task);
  const [taskScore, setTaskScore] = useState<TaskScore>({
    reviewRequestId,
    subTasks: [],
  } as TaskScore);

  useEffect(() => {
    service
      .getTask(taskId)
      .then((foundTask) => {
        setTask(foundTask as Task);
        setTaskScore({
          ...taskScore,
          subTasks: (foundTask as Task).subTasks.map((el) => ({
            id: el.id,
            score: el.score,
            comment: '',
          })),
        });
      })
      .then(() => {
        service.getTaskScoreByRequestId(reviewRequestId).then((taskScoreFromBD) => {
          setFoundTaskScore(true);
          setTaskScore(taskScoreFromBD as TaskScore);
        });
      });
  }, [service, reviewRequestId, taskId, taskScore]);

  const categories = getTaskCategories(task, taskScore);

  const onScoreChange = (subTaskId: number | string, score: number, category: string) => {
    categories[category].find((el: TaskItem) => el.id === subTaskId).score = score;
    setTaskScore({
      ...taskScore,
      subTasks: taskScore.subTasks.map((el) => {
        if (el.id === subTaskId) {
          return {
            ...el,
            score,
          };
        }
        return el;
      }),
    });
  };
  const onSave = useCallback(() => {
    if (foundTaskScore) {
      service.putTaskScore(taskScore.id as string, taskScore).then(() => {
        message.success('task score updated');
      });
    } else {
      service.postTaskScore(taskScore).then(() => {
        setFoundTaskScore(true);
        message.success('task score created');
      });
    }
  }, [foundTaskScore, taskScore, service]);

  return (
    <div id="task-review">
      <Header />

      <TaskReviewForm
        taskState={task.state}
        taskAuthor={task.author}
        taskName={task.name}
        categories={categories}
        onScoreChange={onScoreChange}
      />

      <Button type="primary" onClick={onSave}>
        Save
      </Button>
    </div>
  );
});
