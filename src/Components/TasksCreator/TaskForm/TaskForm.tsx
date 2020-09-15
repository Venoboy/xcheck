import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import createEssence from '../../../Scripts/createEssenceTask';
import Hoc from '../../Hoc/Hoc';

import classes from './TaskForm.module.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

const TaskForm = (props: any) => {
  const { service, taskName } = props;
  const [task, setTask] = useState({
    name: '',
    author: '',
    state: '',
    subTasks: [],
    description: '',
  });
  const [valueMde, setValueMde] = useState({ value: () => {} });

  const getInstans = (instance: any) => {
    setValueMde(instance);
  };

  useEffect(() => {
    service.getTask(taskName).then((e: any) => setTask(e));
  }, [taskName, service]);

  const onFinish = (values: { [key: string]: any }) => {
    console.log('Success:');
    const description = valueMde.value();
    const taskEssence = createEssence(values, description);
    service.postNewTask(taskEssence).then((e: any) => console.log(e));
    console.log(JSON.stringify(taskEssence));
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      className={classes.taskForm}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <TaskMainInfo taskName={task.name} taskAuthor={task.author} taskState={task.state} />
      <TaskDescription getInstans={getInstans} taskDescription={task.description} />
      <TaskSubTasks taskSubtasks={task.subTasks} />
      <TaskSubmitButton />
    </Form>
  );
};

export default Hoc()(TaskForm);
