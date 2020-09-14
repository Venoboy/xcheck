import React from 'react';
import { connect } from 'react-redux';

import CustomComment from './CustomComment/CustomComment';
import { App } from './CustomComment/commentEditable';

const CommentList = (props: any) => {
  const { user, taskScores, taskId, subTaskIndex } = props;
  const taskScore = taskScores.find((elem: any) => elem.userId === user && elem.taskId === taskId);
  let selfComment;
  let reviewerComment;
  let disputeComment;
  if (taskScore) {
    console.log(taskScore);
    selfComment = taskScore.subTasks[subTaskIndex].comments.self;
    reviewerComment = taskScore.subTasks[subTaskIndex].comments.reviewer;
    disputeComment = taskScore.subTasks[subTaskIndex].comments.dispute;
  }
  return (
    <>
      <CustomComment textComment={selfComment} author="Student" />
      <CustomComment textComment={reviewerComment} author="Reviewer" />
      <CustomComment textComment={disputeComment} author="Student" />
      <App />
    </>
  );
};

const mapStateToProps = (state: any) => ({
  taskScores: state.taskScores,
});

export default connect(mapStateToProps)(CommentList);
