import React from 'react';
import Header from '../Header/Header';
import TaskForm from './TaskForm/TaskForm';
import classes from './TasksCreator.module.scss';

const TasksCreator: React.FC = () => {
  const editTaskName = 'MH6LY96FSOLrKaoKE';
  return (
    <div className={classes.tasksCreator}>
      <Header />
      <TaskForm
        editTaskMode={window.location.href === 'http://localhost:3000/task-create'}
        editTaskName={editTaskName}
      />
    </div>
  );
};

export default TasksCreator;
