import React, { useState } from 'react';
import { Form } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';

import './TaskForm.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

const TaskForm = () => {
  const [description, setDescription] = useState('');
  const onFinish = (values: { [key: string]: any }) => {
    values.description = description;
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const changeDiscription: any = (value: any) => {
    setDescription(value);
    console.log(description);
  };
  return (
    <Form
      id="task-form"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <TaskMainInfo />
      <TaskDescription change={changeDiscription} />
      <TaskSubTasks />
      <TaskSubmitButton />
    </Form>
  );
};

export default TaskForm;
