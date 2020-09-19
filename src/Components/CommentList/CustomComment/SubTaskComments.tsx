/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { Avatar, Comment, List } from 'antd';

import classes from './SubTaskComments.module.scss';
import NewComment from './NewComment';

const CustomList = ({ comments }: any) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props: any) => <Comment {...props} />}
  />
);

export const SubTaskComments = (props: any) => {
  const { initialComments, isAddingComment, subTaskIndex } = props;
  const [comments, setComments] = useState<any>(initialComments);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  // const [clicked, setClicked] = useState(false);
  // const [editableStr, setEditableStr] = useState(value);
  // console.log(comments);

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);
    // setClicked(true);

    setComments((prevState: any) => {
      return [
        ...prevState,
        {
          author: 'Han Solo',
          avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
          content: <p>{value}</p>,
        },
      ];
    });
    setSubmitting(false);
    // setEditableStr(value);
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  // clicked ? (
  //   <>
  //     <Avatar
  //       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
  //       alt="Han Solo"
  //     />
  //     <Paragraph editable={{ onChange: setEditableStr }}>{editableStr}</Paragraph>
  //   </>
  // ) :

  return (
    <div className={classes.commentsWrapper}>
      {comments.length > 0 && <CustomList comments={comments} />}
      {isAddingComment.length > 0 && isAddingComment[subTaskIndex] ? (
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <NewComment
              onChange={handleChange}
              onSubmit={handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      ) : null}
    </div>
  );
};
