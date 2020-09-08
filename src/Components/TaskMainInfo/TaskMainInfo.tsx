import React from 'react';
import { Button, Col, DatePicker, Form, Input, Row } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';

const TaskMainInfo = () => {
  const { RangePicker } = DatePicker;
  return (
    <Row>
      <Col span={12}>
        <Form.Item
          label="Task Name"
          name="task-name"
          rules={[{ required: true, message: 'Please enter Task Name' }]}
        >
          <Input placeholder="Enter Task Name" suffix={<EditOutlined />} />
        </Form.Item>
        <Form.Item
          label="Author"
          name="author-name"
          rules={[{ required: true }]}
          initialValue="User"
        >
          <Input placeholder="Author" suffix={<EditOutlined />} />
        </Form.Item>
        <Form.Item label="Range Date" name="deadline-time" rules={[{ required: true }]}>
          <RangePicker showTime placeholder={['Start Date', 'Deadline']} />
        </Form.Item>
      </Col>
      <Col span={8} offset={4}>
        <Button type="dashed" shape="round" style={{ marginBottom: '24px', width: '200px' }}>
          Import RSS Checklist
        </Button>
        <br />
        <Button type="dashed" shape="round" style={{ marginBottom: '24px', width: '200px' }}>
          Import Markdown
        </Button>
        <br />
        <Button type="primary" shape="round" style={{ marginBottom: '24px', width: '200px' }}>
          Import Json
        </Button>
      </Col>
    </Row>
  );
};

export default TaskMainInfo;
