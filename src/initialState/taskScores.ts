const taskScore1: any = {
  userId: 11111,
  taskId: '-MHYG_Mmt_L2D5QLQtep',
  taskScoreId: 1,
  subTasks: [
    {
      score: {
        self: 20,
        reviewer: 'Ok',
        dispute: 'Ok',
      },
      comments: {
        self: 'Well done!',
        reviewer: 'Good enough',
        dispute: '',
      },
    },
    {
      score: {
        self: 15,
        reviewer: 0,
        dispute: 'Ok',
      },
      comments: {
        self: 'Some things are done, some are not',
        reviewer: 'Not done at all',
        dispute: 'Sorry, did all than i could',
      },
    },
    {
      score: {
        self: 0,
        reviewer: 'Ok',
        dispute: 'Ok',
      },
      comments: {
        self: '',
        reviewer: '',
        dispute: '',
      },
    },
  ],
};

const taskScore2: any = {
  userId: 22222,
  taskId: 'MH6LnTePa2cTDVQjx',
  taskScoreId: 2,
  subTasks: [
    {
      score: {
        self: 20,
        reviewer: 'Ok',
        dispute: 'Ok',
      },
      comments: {
        self: '',
        reviewer: 'Errors in console',
        dispute: '',
      },
    },
    {
      score: {
        self: 10,
        reviewer: 0,
        dispute: 'Ok',
      },
      comments: {
        self: 'Some things are done, some are not',
        reviewer: 'Not done at all',
        dispute: 'Sorry, did all than i could',
      },
    },
    {
      score: {
        self: 10,
        reviewer: 0,
        dispute: 'Ok',
      },
      comments: {
        self: '',
        reviewer: '',
        dispute: '',
      },
    },
  ],
};

const taskScores = [taskScore1, taskScore2];

export default taskScores;
