import getFromBD from '../../Service/getFromBD';

const getAsyncInfo = async (setFn: any, taskId: string) => {
  const result = await getFromBD(`tasks/${taskId}`);
  // console.log(result);
  setFn(result);
};

export default getAsyncInfo;
