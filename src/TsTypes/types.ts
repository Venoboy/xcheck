export type subTaskType = {
  category: string;
  description: string;
  id: number;
  mentorCheck: boolean;
  score: number;
  title: string;
};

type taskType = {
  author: string;
  description: string;
  id: number;
  subTasks: Array<subTaskType>;
  name: string;
  state: string;
};

export type stateType = {
  loaded: boolean;
  user: string | null;
  task: taskType;
};
