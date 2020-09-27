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
import Selfcheck from '../Selfcheck/Selfcheck';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/dispute">
            <DisputeSelector />
          </Route>
          <Route path="/submit-task">
            <SelectingTask />
          </Route>
          <Route exact path="/tasks-list">
            <TasksList />
          </Route>
          <Route path="/task-review">
            <TaskReview />
          </Route>
          <Route path="/self-check" component={Selfcheck} />
          <Route path="/tasks-creator">
            <TasksCreator />
          </Route>
          <Route path="/authorization" component={Auth} />
          <Route path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
