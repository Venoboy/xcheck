import React from 'react';
import Header from '../Header/Header';
import './TasksCreator.css';

const TasksCreator = () => {
  const TaskMainInfo = () => {
    return <div>MainInfo</div>;
  };

  return (
    <div className="tasks-creator">
      <Header />
      <TaskMainInfo />
    </div>
  );
};

export default TasksCreator;
