import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../Auth/Auth';
import CheckSession from '../CheckSession/CheckSession';
import SessionsList from '../CheckSession/SessionsList/SessionsList';
import TasksList from '../TasksList/TasksList';
import { TaskReview } from '../../TaskReview/TaskReview';
import TasksCreator from '../TasksList/TasksCreator/TasksCreator';
import Main from '../../Pages/Main/Main';
import SelectingTask from '../SelectingTask/SelectingTask';
import ReviewRequests from '../../Pages/ReviewRequests/ReviewRequests';
import Score from '../../Pages/Score/Score';
import DisputeSelector from '../Dispute/DisputeSelector/DisputeSelector';
import Selfcheck from '../Selfcheck/Selfcheck';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/authorization" component={Auth} />
          <Route exact path="/checksession/list" component={SessionsList} />
          <Route path="/checksession" component={CheckSession} />
          <Route path="/dispute">
            <DisputeSelector />
          </Route>
          <Route path="/tasks-list">
            <TasksList />
          </Route>
          <Route path="/self-check" component={Selfcheck} />
          <Route path="/task-review">
            <TaskReview />
          </Route>
          <Route path="/submit-task" component={SelectingTask} />
          <Route path="/task-create">
            <TasksCreator />
          </Route>
          <Route path="/score" component={Score} />
          <Route path="/review-requests" component={ReviewRequests} />
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
