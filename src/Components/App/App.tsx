import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Auth from '../Auth/Auth';
import TasksList from '../TasksList/TasksList';
import { TaskReview } from '../../TaskReview/TaskReview';
import TasksCreator from '../TasksList/TasksCreator/TasksCreator';
import Main from '../../Pages/Main/Main';
import SelectingTask from '../SelectingTask/SelectingTask';
import DisputeSelector from '../Dispute/DisputeSelector/DisputeSelector';
import { Selfcheck } from '../Selfcheck/Selfcheck';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/authorization" component={Auth} />
          <Route path="/dispute">
            <DisputeSelector />
          </Route>
          <Route path="/tasks-list">
            <TasksList />
          </Route>
          <Route path="/task-review">
            <TaskReview />
          </Route>
          <Route path="/selfcheck">
            <Selfcheck reviewRequestId="rss2020Q3react-xcheck-14910204" />
          </Route>
          <Route path="/tasks-creator">
            <TasksCreator />
          </Route>
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
