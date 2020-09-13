import React from 'react';
import TasksCreator from '../TasksCreator/TasksCreator';
import { Selfcheck } from '../Selfcheck/Selfcheck';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dispute from '../Dispute/Dispute';
import { TasksList } from '../TasksList/TasksList';
import { TaskReview } from '../../TaskReview/TaskReview';

const App: React.FC = () => {
  return (
    <div className="App">
      <Selfcheck />
      <TasksCreator />
    </div>
  );
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
        </Switch>
      </Router>
    </div>);
};

export default App;
