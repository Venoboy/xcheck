/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { Comment, List } from 'antd';
import { UserOutlined } from '@ant-design/icons/lib';

import classes from './CommentsList.module.scss';
import AddComment from './CustomComment/AddComment';
import buildComments from './buildComments';

const CustomList = ({ comments }: any) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={(props: any) => <Comment {...props} />}
  />
);

const CommentList = (props: any) => {
  const {
    isAddingComment,
    setIsAddingComment,
    taskScore,
    setTaskScore,
    subTaskIndex,
    stage,
    setActiveButtons,
  } = props;

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<any>([]);

  const setOnEdit = (string: string) => {
    setTaskScore((oldTaskScore: any) => {
      const newTaskScore = { ...oldTaskScore };
      if (newTaskScore.index >= 0) {
        newTaskScore.object.subTasks[subTaskIndex].comments = {
          ...newTaskScore.object.subTasks[subTaskIndex].comments,
          [stage]: string,
        };
      }
      return newTaskScore;
    });
  };

  const settings = { taskScore, subTaskIndex, stage, setOnEdit };

  useEffect(() => {
    if (Object.keys(taskScore.object).length > 0) {
      setComments(buildComments(settings));
    }
  }, [taskScore]); // eslint-disable-line

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);

    setTaskScore((oldTaskScore: any) => {
      const newTaskScore = {
        ...oldTaskScore,
      };
      newTaskScore.object.subTasks[subTaskIndex].comments[stage] = value;
      return newTaskScore;
    });

    setIsAddingComment((oldComments: any) => {
      const newComments = [...oldComments];
      newComments[subTaskIndex] = false;
      return newComments;
    });

    setSubmitting(false);

    setActiveButtons((prevActiveButtons: any) => {
      const current = [...prevActiveButtons];
      current[subTaskIndex] = value.length <= 0;
      return current;
    });
  };

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  return (
    <div className={classes.commentsWrapper}>
      {comments.length > 0 && <CustomList comments={comments} />}
      {isAddingComment.length > 0 && isAddingComment[subTaskIndex] ? (
        <Comment
          avatar={<UserOutlined />}
          content={
            <AddComment
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

export default CommentList;
