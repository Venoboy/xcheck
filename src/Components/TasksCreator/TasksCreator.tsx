import React from 'react';
import Header from '../Header/Header';
import TaskForm from './TaskForm/TaskForm';
import classes from './TasksCreator.module.scss';

interface TasksCreatorProps {
  editTask: boolean;
}

const TasksCreator: React.FC<TasksCreatorProps> = (props) => {
  const { editTask } = props;
  const editTaskName = '-MHKgO1kKjrl-xacp4bc';
  return (
    <div className={classes.tasksCreator}>
      <Header />
      <TaskForm editTaskMode={editTask} editTaskName={editTaskName} />
    </div>
  );
};

export default TasksCreator;
