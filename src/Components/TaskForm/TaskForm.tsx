import React from 'react';
import { Input, Form, DatePicker } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { EditOutlined } from '@ant-design/icons';

import './TaskForm.scss';
import 'antd/dist/antd.css';

const TaskForm = () => {
  const { RangePicker } = DatePicker;
  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      id="task-form"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 10 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Task Name"
        name="task-name"
        rules={[{ required: true, message: 'Please enter Task Name' }]}
      >
        <Input placeholder="Enter Task Name" suffix={<EditOutlined />} />
      </Form.Item>
      <Form.Item label="Author" name="author-name" rules={[{ required: true }]} initialValue="User">
        <Input placeholder="Author" suffix={<EditOutlined />} />
      </Form.Item>
      <Form.Item label="Range Date" name="deadline-time" rules={[{ required: true }]}>
        <RangePicker showTime placeholder={['Start Date', 'Deadline']} />
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
