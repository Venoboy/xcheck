import getFromDB from '../../../Service/getFromDB';

const getAsyncInfo = async (setFn: any, taskId: string) => {
  const result = await getFromDB(`tasks/${taskId}`);
  // console.log(result);
  setFn(result);
};

export default getAsyncInfo;
