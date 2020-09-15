import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TasksCreator from '../TasksCreator/TasksCreator';
import { Selfcheck } from '../Selfcheck/Selfcheck';
import 'antd/dist/antd.css';
import './App.scss';
import Dispute from '../Dispute/Dispute';
import { TasksList } from '../TasksList/TasksList';
import { TaskReview } from '../../TaskReview/TaskReview';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dispute">
            <Dispute isActive={false} />
          </Route>
          <Route path="/tasks-list">
            <TasksList />
          </Route>
          <Route path="/task-review">
            <TaskReview />
          </Route>
          <Route path="/selfcheck">
            <Selfcheck />
          </Route>
          <Route path="/tasks-creator">
            <TasksCreator />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
