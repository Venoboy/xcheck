const taskScore1: any = {
  taskId: 1,
  taskScoreId: 1,
  items: {
    basic_p1: { score: 20, comment: 'Well done!' },
    extra_p1: { score: 15, comment: 'Some things are done, some are not' },
    fines_p1: { score: 0, comment: 'No ticket today' },
  },
};

const taskScore2: any = {
  taskId: 2,
  taskScoreId: 2,
  items: {
    basic_p1: { score: 20, comment: 'Job done!' },
    extra_p1: { score: 15, comment: 'Nothing is possible' },
    fines_p1: { score: 0, comment: 'Fell asleep' },
  },
};

const taskScores = [taskScore1, taskScore2];

export default taskScores;
