const taskScore1: any = {
  taskId: 1,
  taskScoreId: 1,
  items: {
    basic_p1: {
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
    extra_p1: {
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
    fines_p1: {
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
  },
};

const taskScore2: any = {
  taskId: 2,
  taskScoreId: 2,
  items: {
    basic_p1: {
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
    extra_p1: {
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
    fines_p1: {
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
  },
};

const taskScores = [taskScore1, taskScore2];

export default taskScores;
