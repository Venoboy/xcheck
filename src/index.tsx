import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './Components/App/App';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import Store from './Store/Store';
import Context from './Context/Context';
import Service from './Service/Service';
import './index.scss';

const service: any = new Service();

ReactDOM.render(
  <Provider store={Store}>
    <ErrorBoundary>
      <Context.Provider value={service}>
        <App />
      </Context.Provider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
);
