const createEssence = (valueForm: any, description: any) => {
  type taskType = {
    name: string;
    author: string;
    state: string;
    description: string;
    subTasks: object[];
  };

  const subTasks = valueForm.tasks.map((task: any, index: number) => {
    const formatTask: any = {
      id: index,
      title: task.title,
      category: task.category,
      mentorCheck: task.mentorCheck,
      description: task.description,
      score: Number(task.score),
    };
    return formatTask;
  });
  const task: taskType = {
    name: valueForm.taskName,
    author: valueForm.authorName,
    state: valueForm.typeState,
    subTasks,
    description,
  };
  return task;
};

export default createEssence;
