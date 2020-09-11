import React from 'react';
import TasksCreator from '../TasksCreator/TasksCreator';
import 'antd/dist/antd.css';
import './App.scss';
// import Dispute from '../Dispute/Dispute';

const App = () => {
  return (
    <div className="App">
      <TasksCreator />
      {/* <Dispute isActive={false} /> */}
    </div>
  );
};

export default App;
