const reviewRequest1 = {
  id: 'rev-req-1',
  checkSessionId: 'rss2020Q3react-xcheck',
  author: 11111,
  task: 'simple-task-v1',
  state: 'PUBLISHED', // enum [DRAFT, PUBLISHED, COMPLETED]
  taskScoreId: 1,
  solution: 'https://www.youtube.com/',
};

const reviewRequest2 = {
  id: 'rev-req-2',
  checkSessionId: 'rss2020Q3react-songbird',
  author: 22222,
  task: 'simple-task-v2',
  state: 'PUBLISHED', // enum [DRAFT, PUBLISHED, COMPLETED]
  taskScoreId: 2,
  solution: 'https://www.google.ru/',
};

const reviewRequests = [reviewRequest1, reviewRequest2];

export default reviewRequests;
