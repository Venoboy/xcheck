import getFromBD from '../../Service/getFromBD';

const getAsyncInfo = async (setFn: any, taskId: string) => {
  setFn(await getFromBD(`/tasks/${taskId}`));
};

export default getAsyncInfo;
