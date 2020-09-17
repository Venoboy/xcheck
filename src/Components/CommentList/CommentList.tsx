import React from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';

import { SubTaskComments } from './CustomComment/SubTaskComments';
import stages from './stages';

const { Text } = Typography;

const CommentList = (props: any) => {
  const { user, taskScores, taskId, subTaskIndex, isAddingComment, stage } = props;
  const taskScore = taskScores.find((elem: any) => elem.userId === user && elem.taskId === taskId);
  const commentsArray: any = [];

  if (taskScore && taskScore.subTasks.length > 0 && taskScore.subTasks[subTaskIndex]) {
    console.log(subTaskIndex, taskScore.subTasks);
    const selfText = taskScore.subTasks[subTaskIndex].comments.self;
    const reviewerText = taskScore.subTasks[subTaskIndex].comments.reviewer;
    const disputeText = taskScore.subTasks[subTaskIndex].comments.dispute;

    const authorComment = {
      author: 'Student',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <Text editable={stage === stages.selfCheck}>{selfText}</Text>,
    };
    if (selfText) {
      commentsArray.push(authorComment);
    }
    const reviewerComment = {
      author: 'Reviewer',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <Text editable={stage === stages.reviewerCheck}>{reviewerText}</Text>,
    };
    if (reviewerText) {
      commentsArray.push(reviewerComment);
    }
    const disputeComment = {
      author: 'Student',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      content: <Text editable={stage === stages.disputeCheck}>{disputeText}</Text>,
    };
    if (disputeText) {
      commentsArray.push(disputeComment);
    }
  }

  return (
    <SubTaskComments
      isAddingComment={isAddingComment}
      initialComments={commentsArray}
      subTaskIndex={subTaskIndex}
    />
  );
};

const mapStateToProps = (state: any) => ({
  taskScores: state.taskScores,
});

export default connect(mapStateToProps)(CommentList);
