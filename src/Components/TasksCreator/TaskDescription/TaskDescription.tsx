import React from 'react';
import { Divider, Form } from 'antd';
import SimpleMDE from 'react-simplemde-editor';

const TaskDescription = (props: any) => {
  const { getInstans } = props;
  return (
    <Form.Item wrapperCol={{ span: 24 }} style={{ margin: '15px' }}>
      <Divider>Description Task</Divider>
      <SimpleMDE id="simple-mde" getMdeInstance={getInstans} />
    </Form.Item>
  );
};

export default TaskDescription;
