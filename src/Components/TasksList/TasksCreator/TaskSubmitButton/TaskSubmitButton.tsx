import React from 'react';
import { Button, Form } from 'antd';

interface taskSubmitButtonType {
  editMode: boolean;
}

const TaskSubmitButton: React.FC<taskSubmitButtonType> = (props) => {
  const { editMode } = props;
  return (
    <Form.Item wrapperCol={{ span: 24 }}>
      <Button
        style={{ backgroundColor: '#50c400', color: 'white' }}
        type="default"
        htmlType="submit"
        block
      >
        {editMode ? 'Save Changes' : 'Create Task'}
      </Button>
    </Form.Item>
  );
};

export default TaskSubmitButton;
