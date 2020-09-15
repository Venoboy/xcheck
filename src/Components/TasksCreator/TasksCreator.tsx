import React from 'react';
import Header from '../Header/Header';
import TaskForm from './TaskForm/TaskForm';
import classes from './TasksCreator.module.scss';

const TasksCreator = ({ taskName }: any) => {
  return (
    <div className={classes.tasksCreator}>
      <Header />
      <TaskForm taskName={taskName} />
    </div>
  );
};

export default TasksCreator;
