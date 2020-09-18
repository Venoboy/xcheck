import React from 'react';
import { Form, Button } from 'antd';
import TaskMainInfo from '../TasksList/TasksCreator/TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TasksList/TasksCreator/TaskDescription/TaskDescription';
import TaskSubTasks from '../TasksList/TasksCreator/TaskSubTasks/TaskSubTasks';

import 'antd/dist/antd.css';

const TaskForm = () => {
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const { Item } = Form;

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
      <Item wrapperCol={{ span: 24 }}>
        <Button
          style={{ backgroundColor: '#50c400', color: 'black', borderColor: 'black' }}
          type="default"
          htmlType="submit"
          onSubmit={(e) => console.log(e)}
          block
        >
          Save Task
        </Button>
      </Item>
    </Form>
  );
};

export default TaskForm;
