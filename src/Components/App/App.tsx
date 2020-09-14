import React from 'react';
import 'antd/dist/antd.css';

import './App.scss';
// import TasksCreator from '../TasksCreator/TasksCreator';
import Dispute from '../Dispute/Dispute';

const App = () => {
  return (
    <div className="App">
      {/* <TasksCreator /> */}
      <Dispute isActive user={11111} />
    </div>
  );
};

export default App;
