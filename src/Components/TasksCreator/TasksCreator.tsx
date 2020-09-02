import React from 'react';
import Header from '../Header/Header';
import TaskForm from '../TaskForm/TaskForm';
import './TasksCreator.scss';

const TasksCreator = () => {
  return (
    <div className="tasks-creator">
      <Header />
      <TaskForm />
    </div>
  );
};

export default TasksCreator;
