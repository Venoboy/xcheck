import React, { useState } from 'react';
import { Form } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import createEssence from '../../../Scripts/createEssenceTask';

// @ts-ignore
import classes from './TaskForm.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

const TaskForm = () => {
  const [valueMde, setValueMde] = useState({ value: () => {} });
  const getInstans = (instance: any) => {
    setValueMde(instance);
  };
  const onFinish = (values: { [key: string]: any }) => {
    console.log('Success:');
    const description = valueMde.value();
    const taskEssence = createEssence(values, description);
    console.log(taskEssence);
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
      <TaskMainInfo />
      <TaskDescription getInstans={getInstans} />
      <TaskSubTasks />
      <TaskSubmitButton />
    </Form>
  );
};

export default TaskForm;
