import users from './users';
import checkSessions from './checkSessions';
import tasks from './tasks';
import disputes from './disputes';
import reviewRequests from './reviewRequests';
import taskScores from './taskScores';
import reviews from './reviews';
import feedbacks from './feedbacks';
import currentState from './currentState';

const initialState: any = {
  checkSessions,
  users,
  tasks,
  disputes,
  reviewRequests,
  taskScores,
  reviews,
  feedbacks,
  currentState,
};

export default initialState;
