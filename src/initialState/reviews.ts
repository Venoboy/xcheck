const reviews1 = {
  id: 'rev-id-1',
  requestId: 'rev-req-1',
  author: 'ButterBrot777',
  state: 'DISPUTED', // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
  grade: {}, // embedded taskScore object
};

const reviews2 = {
  id: 'rev-id-2',
  requestId: 'rev-req-2',
  author: 'ButterBrot777',
  state: 'DISPUTED', // enum [DRAFT, PUBLISHED, DISPUTED, ACCEPTED, REJECTED],
  grade: {}, // embedded taskScore object
};

const reviews = [reviews1, reviews2];

export default reviews;
