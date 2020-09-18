import getFromBD from '../../Service/getFromBD';

const activeBtnHandler = async (setActiveButtons: any, taskId: any) => {
  const taskScores = await getFromBD('/taskScores');
  if (taskScores.length === 0) return;
  const taskScore = taskScores.find((elem: any) => elem.taskId === taskId);
  if (!taskScore) return;
  const resultArray = taskScore.subTasks.map((subTask: any) => subTask.comments.dispute === '');
  setActiveButtons(resultArray);
};

export default activeBtnHandler;
