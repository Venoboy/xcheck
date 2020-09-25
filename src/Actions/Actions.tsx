type requestsType = { type: 'REQUESTS' };
const requests = (): requestsType => {
  return {
    type: 'REQUESTS',
  };
};

export type TaskInfo = { selectedTaskId: string; checkSessionId: string };
const changeSelectedTaskId = (taskInfo: TaskInfo) => {
  const { selectedTaskId, checkSessionId } = taskInfo;
  return {
    type: 'CHANGE_SELECTED_TASK_INFO',
    payload: { selectedTaskId, checkSessionId },
  };
};

export { requests, changeSelectedTaskId };
