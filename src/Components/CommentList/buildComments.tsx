import React from 'react';
import { UserOutlined } from '@ant-design/icons/lib';

import stages from './stages';
import singleComment from './CustomComment/singleComment';

const buildComments = (settings: any) => {
  const { taskScore, subTaskIndex, stage, setOnEdit } = settings;
  const commentsArray: any = [];

  if (
    taskScore.object &&
    taskScore.object.subTasks.length > 0 &&
    taskScore.object.subTasks[subTaskIndex]
  ) {
    const selfText = taskScore.object.subTasks[subTaskIndex].comments.self;
    const reviewerText = taskScore.object.subTasks[subTaskIndex].comments.reviewer;
    const disputeText = taskScore.object.subTasks[subTaskIndex].comments.dispute;

    const authorComment = singleComment({
      value: selfText,
      avatar: <UserOutlined />,
      setOnEdit,
      author: 'Student',
      isEditable: stage === stages.selfCheck,
    });

    if (selfText) {
      commentsArray.push(authorComment);
    }

    const reviewerComment = singleComment({
      value: reviewerText,
      avatar: <UserOutlined />,
      setOnEdit,
      author: 'Reviewer',
      isEditable: stage === stages.reviewerCheck,
    });
    if (reviewerText) {
      commentsArray.push(reviewerComment);
    }

    const disputeComment = singleComment({
      value: disputeText,
      avatar: <UserOutlined />,
      setOnEdit,
      author: 'Student',
      isEditable: stage === stages.disputeCheck,
    });
    if (disputeText) {
      commentsArray.push(disputeComment);
    }
  }

  return commentsArray;
};

export default buildComments;
