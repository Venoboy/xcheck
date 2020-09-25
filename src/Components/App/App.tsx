import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dispute from '../Dispute/Dispute';
import Auth from '../Auth/Auth';
import TasksList from '../TasksList/TasksList';
import { TaskReview } from '../../TaskReview/TaskReview';
import TasksCreator from '../TasksList/TasksCreator/TasksCreator';
import Main from '../../Pages/Main/Main';
import SelectingTask from '../SelectingTask/SelectingTask';

const App: React.FC = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/authorization" component={Auth} />
          <Route path="/dispute">
            <Dispute />
          </Route>
          <Route path="/tasks-list">
            <TasksList />
          </Route>
          <Route path="/task-review">
            <TaskReview />
          </Route>
          <Route path="/submit-task" component={SelectingTask} />
          <Route path="/task-create">
            <TasksCreator />
          </Route>
          <Route exact path="/" component={Main} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
