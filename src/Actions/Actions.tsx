type requestsType = { type: 'REQUESTS' };
const requests = (): requestsType => {
  return {
    type: 'REQUESTS',
  };
};

const changeSelectedTaskId = (selectedTaskId: string) => {
  return {
    type: 'CHANGE_SELECTED_TASK_ID',
    payload: selectedTaskId,
  };
};

export { requests, changeSelectedTaskId };
