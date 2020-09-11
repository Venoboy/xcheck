import React from 'react';
import Header from '../Header/Header';
import TaskForm from './TaskForm/TaskForm';
// @ts-ignore
import classes from './TasksCreator.scss';

const TasksCreator = () => {
  return (
    <div className={classes.tasksCreator}>
      <Header />
      <TaskForm />
    </div>
  );
};

export default TasksCreator;
