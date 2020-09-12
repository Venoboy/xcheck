import users from './users';
import checkSessions from './checkSessions';
import tasks from './tasks';
import disputes from './disputes';
import reviewRequests from './reviewRequests';
import taskScores from './taskScores';
import reviews from './reviews';

const initialState: any = {
  checkSessions,
  users,
  tasks,
  disputes,
  reviewRequests,
  taskScores,
  reviews,
};

export default initialState;
