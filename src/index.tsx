import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Store from './Store/Store';
import Context from './Context/Context';
import Service from './Service/Service';
import './index.scss';
import App from './Components/App/App';
import Dispute from './Components/Dispute/Dispute';
import { TasksList } from './Components/TasksList/TasksList';
import { TaskReview } from './TaskReview/TaskReview';

const service = new Service();

ReactDOM.render(
  <Provider store={Store}>
    <ErrorBoundary>
      <Context.Provider value={service}>
        <Router>
          <Switch>
            <Route path="/dispute">
              <App>
                <Dispute isActive={false} />
              </App>
            </Route>
            <Route path="/tasks-list">
              <App>
                <TasksList />
              </App>
            </Route>
            <Route path="/task-review">
              <App>
                <TaskReview />
              </App>
            </Route>
          </Switch>
        </Router>
      </Context.Provider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root')
);
