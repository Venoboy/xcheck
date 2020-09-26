import { Task, TaskScoreItem } from '../../Reducer/reducer';

export function getTaskCategories(task: Task, taskScore?: { subTasks: TaskScoreItem[] }) {
  const categories = task.subTasks.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.category]: [],
    };
  }, Object.create(null));
  Object.keys(categories).forEach((category) => {
    const subTasks = task?.subTasks
      .filter((item) => item.category === category)
      .map((subTask) => {
        if (taskScore) {
          const taskScoreSubItem = taskScore.subTasks.find((el) => el.id === subTask.id);
          if (taskScoreSubItem) {
            subTask.score = taskScoreSubItem.score;
          }
        }
        return subTask;
      });
    categories[category] = subTasks;
  });
  return categories;
}
