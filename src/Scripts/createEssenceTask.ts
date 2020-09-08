const createEssence = (valueForm: any, description: any) => {
  type taskType = {
    name: string;
    id: string;
    author: string;
    state: string;
    description: string;
    subTasks: object[];
  };

  const subTasks = valueForm.tasks.map((task: any, index: number) => {
    const formatTask: any = {
      id: index,
      title: task.nameSubtask,
      category: task.typeTask,
      mentorCheck: task.mentorCheck,
      description: task.descSubtask,
      score: task.costSubtask
    };
    return formatTask;
  });
  const task: taskType = {
    name: valueForm.taskName,
    id: `${valueForm.taskName}-${valueForm.authorName}`,
    author: valueForm.authorName,
    state: 'Draft',
    subTasks,
    description
  };
  return task;
};

export default createEssence;
