import React from 'react';
import { Form, Button } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';

import './TaskForm.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

const TaskForm = () => {
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
      <TaskDescription />
      <TaskSubTasks />
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          style={{ backgroundColor: '#50c400', color: 'black', borderColor: 'black' }}
          type="default"
          htmlType="submit"
          onSubmit={e => console.log(e)}
          block
        >
          Save Task
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
