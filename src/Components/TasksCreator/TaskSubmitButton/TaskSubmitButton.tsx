import React from 'react';
import { Button, Form } from 'antd';

const TaskSubmitButton = () => {
  return (
    <Form.Item wrapperCol={{ span: 24 }}>
      <Button
        style={{ backgroundColor: '#50c400', color: 'white' }}
        type="default"
        htmlType="submit"
        block
      >
        Save Task
      </Button>
    </Form.Item>
  );
};

export default TaskSubmitButton;
