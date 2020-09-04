import React from 'react';
import { Input, Form, DatePicker, Col, Button, Row, Divider } from 'antd';
import { EditOutlined, PlusOutlined, MinusCircleOutlined } from '@ant-design/icons/lib';
import SimpleMDE from 'react-simplemde-editor';

import './TaskForm.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

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
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
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
      <Form.Item wrapperCol={{ span: 24 }} name="introduction" style={{ margin: '15px' }}>
        <Divider>Description Task</Divider>
        <SimpleMDE />
      </Form.Item>
      <Form.List name="tasks">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field) => (
                <Form.Item
                  {...field}
                  wrapperCol={{ span: 24 }}
                  key={field.key}
                  name={[field.name, 'first']}
                  fieldKey={[field.fieldKey, 'first']}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Row>
                    <Col span={20}>
                      <Input placeholder="First Name" />
                    </Col>
                    <Col>
                      <MinusCircleOutlined
                        onClick={() => {
                          remove(field.name);
                          console.log(fields);
                        }}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              ))}

              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                    console.log(fields);
                  }}
                  block
                >
                  <PlusOutlined />
                  Add field
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>

      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          style={{ backgroundColor: '#50c400', color: 'black' }}
          type="default"
          htmlType="submit"
          onSubmit={(e) => console.log(e)}
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TaskForm;
