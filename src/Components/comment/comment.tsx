/* eslint-disable react/jsx-wrap-multilines */
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Comment, Avatar, Form, Button, List, Input, Typography } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { Paragraph } = Typography;

const CommentList = ({ comments }: any) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={(props: any) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }: any) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export const CommentComponent = ({ createSubTaskScoreObject, index, clickedBefore, text }: any) => {
  const [comments, setComments] = useState<any>([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState(text);
  const [clicked, setClicked] = useState(false);
  const [editableStr, setEditableStr] = useState(text);

  useEffect(() => {
    setEditableStr(text);
  }, [text]);

  useEffect(() => {
    if (clickedBefore) {
      createSubTaskScoreObject(index, 'comment', editableStr);
    }
  }, [editableStr]);

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    setClicked(true);

    setComments((prevState: any) => {
      return [
        ...prevState,
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <span>{value}</span>,
          datetime: moment().fromNow(),
        },
      ];
    });
    createSubTaskScoreObject(index, 'comment', value);
    setSubmitting(false);
    setEditableStr(value);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };
  return clicked || clickedBefore ? (
    <>
      <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
    </>
  ) : (
    <>
      {comments.length > 0 && <CommentList comments={comments} />}
      <Comment
        avatar={
          <Avatar
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            alt="Han Solo"
          />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={submitting}
            value={value}
          />
        }
      />
    </>
  );
};
