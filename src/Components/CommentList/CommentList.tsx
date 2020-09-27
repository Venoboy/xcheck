/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import { Comment, List } from 'antd';
import { UserOutlined } from '@ant-design/icons/lib';

import classes from './CommentsList.module.scss';
import AddComment from './CustomComment/AddComment';
import buildComments from './buildComments';
import stages from './stages';

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
    review,
    setReview,
    dispute,
    setDispute,
    subTaskIndex,
    stage,
    setActiveButtons,
  } = props;

  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<any>([]);

  const setOnEdit = (string: string) => {
    switch (stage) {
      case stages.selfCheck:
        setTaskScore((oldTaskScore: any) => {
          const newTaskScore = { ...oldTaskScore };
          newTaskScore.subTasks[subTaskIndex].comment = string;
          return newTaskScore;
        });
        break;
      case stages.reviewerCheck:
        setReview((oldReview: any) => {
          const newReview = { ...oldReview };
          newReview.subTasks[subTaskIndex].comment = string;
          return newReview;
        });
        break;
      case stages.disputeCheck:
        setDispute((oldDispute: any) => {
          const newDispute = { ...oldDispute };
          newDispute.subTasks[subTaskIndex].comment = string;
          return newDispute;
        });
        break;
      default:
        return null;
    }
    if (string === '') {
      setActiveButtons((oldButtons: any) => {
        const newButtons = [...oldButtons];
        newButtons[subTaskIndex] = true;
        return newButtons;
      });
    }
    return null;
  };

  const settings = { taskScore, review, dispute, subTaskIndex, stage, setOnEdit };

  useEffect(() => {
    setComments(buildComments(settings));
  }, [taskScore, review, dispute]); // eslint-disable-line

  const handleSubmit = () => {
    if (!value) {
      return;
    }
    setSubmitting(true);

    setOnEdit(value);
    // setTaskScore((oldTaskScore: any) => {
    //   const newTaskScore = {
    //     ...oldTaskScore,
    //   };
    //   newTaskScore.object.subTasks[subTaskIndex].comments[stage] = value;
    //   return newTaskScore;
    // });

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
              isComment
            />
          }
        />
      ) : null}
    </div>
  );
};

export default CommentList;
