const checkSession1: any = {
  id: 'rss2020Q3react-xcheck',
  state: 'DRAFT', // enum [DRAFT, REQUESTS_GATHERING, CROSS_CHECK, COMPLETED]
  taskId: 'simple-task-v1',
  coefficient: 0.7,
  startDate: '2020-07-07',
  endDate: '2020-07-14',
  crossCheck: {
    discardMinScore: true,
    discardMaxScore: false,
    minReiewsAmount: 1, // how many peer reviews are required to set a score
    desiredReviewersAmount: 2, // how many peers are assigned to evaluate each solution
    attendees: [
      // shuffled randomly when state is cahnged from REQUESTS_GATHERING to CROSS_CHECL
      { githubId: 'ButterBrot777', reviewerOf: ['torvalds', 'cardamo'] },
      { githubId: 'torvalds', reviewerOf: ['cardamo'] },
      { githubId: 'cardamo', reviewerOf: ['ButterBrot777'] },
    ],
  },
};

const checkSession2: any = {
  id: 'rss2020Q3react-songbird',
  state: 'DRAFT', // enum [DRAFT, REQUESTS_GATHERING, CROSS_CHECK, COMPLETED]
  taskId: 'simple-task-v1',
  coefficient: 0.7,
  startDate: '2020-07-07',
  endDate: '2020-07-14',
  crossCheck: false,
};

const checkSessions = [checkSession1, checkSession2];

export default checkSessions;
