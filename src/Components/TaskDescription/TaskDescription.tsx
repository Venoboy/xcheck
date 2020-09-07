import React from 'react';
import { Divider, Form } from 'antd';
import SimpleMDE from 'react-simplemde-editor';

const TaskDescription = () => {
  return (
    <Form.Item wrapperCol={{ span: 24 }} name="introduction" style={{ margin: '15px' }}>
      <Divider>Description Task</Divider>
      <SimpleMDE />
    </Form.Item>
  );
};

export default TaskDescription;
