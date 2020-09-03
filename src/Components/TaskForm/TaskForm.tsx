import React from 'react';
import { Input, Form, Row, Col } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import './TaskForm.scss';
import 'antd/dist/antd.css';

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
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row>
        <Col span={10}>
          <Form.Item
            label="Task Name"
            name="task-name"
            rules={[{ required: true, message: 'Please enter Task Name' }]}
          >
            <Input placeholder="Enter Task Name" suffix={<EditOutlined />} />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item
            label="Author"
            name="author-name"
            rules={[{ required: true }]}
            initialValue="User"
          >
            <Input placeholder="Author" suffix={<EditOutlined />} />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
