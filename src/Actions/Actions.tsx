type requestsType = { type: 'REQUESTS' };
const requests = (): requestsType => {
  return {
    type: 'REQUESTS',
  };
};

export type TaskInfoPayload = { selectedTaskId: string; checkSessionId: string };
export interface SelectedTaskAction {
  type: 'CHANGE_SELECTED_TASK_INFO';
  payload: TaskInfoPayload;
}

const changeSelectedTaskId = (taskInfo: TaskInfoPayload): SelectedTaskAction => {
  const { selectedTaskId, checkSessionId } = taskInfo;
  return {
    type: 'CHANGE_SELECTED_TASK_INFO',
    payload: { selectedTaskId, checkSessionId },
  };
};

export { requests, changeSelectedTaskId };
