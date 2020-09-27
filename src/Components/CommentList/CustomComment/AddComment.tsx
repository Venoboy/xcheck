import React from 'react';
import { Button, Form, Input } from 'antd';

import classes from './AddComment.module.scss';

const { TextArea } = Input;
const AddComment = ({ onChange, onSubmit, submitting, value, isComment }: any) => (
  <>
    <Form.Item className={classes.textArea}>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        {isComment ? 'Add Comment' : 'Add Feedback'}
      </Button>
    </Form.Item>
  </>
);

export default AddComment;
