import React from 'react';
import Header from '../../Header/Header';
import TaskForm from './TaskForm/TaskForm';
import classes from './TasksCreator.module.scss';

const TasksCreator: React.FC = () => {
  let editTaskName: string | boolean = false;
  let editTaskMode: boolean = false;

  if (window.location.pathname !== '/task-create') {
    const taskUrlSplit = window.location.pathname.split('/');
    editTaskName = taskUrlSplit[taskUrlSplit.length - 1];
    editTaskMode = true;
  }

  return (
    <div className={classes.tasksCreator}>
      <Header />
      <TaskForm editTaskMode={editTaskMode} editTaskName={editTaskName} />
    </div>
  );
};

export default TasksCreator;
