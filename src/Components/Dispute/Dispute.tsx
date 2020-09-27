import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Layout, Row, Statistic, Typography, message } from 'antd';
import { connect } from 'react-redux';

import classes from './Dispute.module.scss';
import CommentList from '../CommentList/CommentList';
import Feedback from './Feedback/Feedback';
import stages from '../CommentList/stages';
import getFromDB from '../../Service/getFromDB';
import putToDB from '../../Service/putToDB';

const { Title }: any = Typography;
const { Content }: any = Layout;

const Dispute = (props: any) => {
  const { taskId, taskScoreId, reviewId, disputeId, setDisputeSelectActive } = props;
  const [database, setDatabase] = useState({} as any);
  const [isAddingComment, setIsAddingComment] = useState([] as any);
  const [activeButtons, setActiveButtons] = useState([] as any);
  const [taskScore, setTaskScore] = useState({} as any);
  const [review, setReview] = useState({} as any);
  const [dispute, setDispute] = useState({} as any);

  const isDatabaseEmpty = Object.keys(database).length === 0;
  const task = !isDatabaseEmpty ? database.tasks[taskId] : false;
  const stage = stages.disputeCheck;
  const isMaxMarks = database.tasks && database.tasks[taskId] && database.tasks[taskId].subTasks;
  const maxMarks = isMaxMarks
    ? database.tasks[taskId].subTasks.map((subTask: any) => subTask.score)
    : [];
  const isReviewMarks =
    database.reviews && database.reviews[reviewId] && database.reviews[reviewId].subTasks;
  const reviewMarks = isReviewMarks
    ? database.reviews[reviewId].subTasks.map((subTask: any) => subTask.score)
    : [];

  useEffect(() => {
    const fetchDB = async () => {
      setDatabase(await getFromDB(''));
    };
    if (isDatabaseEmpty) {
      fetchDB();
    }
  });

  useEffect(() => {
    if (!isDatabaseEmpty) {
      if (stage === stages.selfCheck && taskScore && taskScore.subTasks) {
        setActiveButtons(taskScore.subTasks.map((elem: any) => elem.comment === ''));
      }
      if (stage === stages.reviewerCheck && review && review.subTasks) {
        setActiveButtons(review.subTasks.map((elem: any) => elem.comment === ''));
      }
      if (stage === stages.disputeCheck && dispute && dispute.subTasks) {
        setActiveButtons(dispute.subTasks.map((elem: any) => elem.comment === ''));
      }
    }
  }, [isDatabaseEmpty, taskScore, review, dispute, stage]);

  useEffect(() => {
    const isTaskScore = !isDatabaseEmpty && taskScore && Object.keys(taskScore).length === 0;
    if (isTaskScore) {
      setTaskScore(database.taskScores[taskScoreId]);
    }
  }, [isDatabaseEmpty, taskScore, database, taskScoreId]);

  useEffect(() => {
    const isReview = !isDatabaseEmpty && review && Object.keys(review).length === 0;
    if (isReview) {
      setReview(database.reviews[reviewId]);
    }
  }, [isDatabaseEmpty, review, database, reviewId]);

  useEffect(() => {
    const isDispute = !isDatabaseEmpty && dispute && Object.keys(dispute).length === 0;
    if (isDispute) {
      setDispute(database.disputes[disputeId]);
    }
  }, [isDatabaseEmpty, dispute, database, disputeId]);

  const sendCommentsToBD = () => {
    const hide = message.loading('Action in progress..', 0);
    if (stage === stages.selfCheck) {
      putToDB(`taskScores/${taskScoreId}`, taskScore).then(() => {
        hide();
        setDisputeSelectActive(true);
      });
    }
    if (stage === stages.reviewerCheck) {
      putToDB(`reviews/${reviewId}`, review).then(() => {
        hide();
        setDisputeSelectActive(true);
      });
    }
    if (stage === stages.disputeCheck) {
      putToDB(`disputes/${disputeId}`, dispute).then(() => {
        hide();
        setDisputeSelectActive(true);
      });
    }
  };

  if (task && task.subTasks && task.subTasks.length > 0 && isAddingComment.length === 0) {
    setIsAddingComment(new Array(task.subTasks.length).fill(false));
  }

  let subTasks = null;

  const commentButtonHandler = (index: number, value: boolean) => {
    const addingCommentCurrent = [...isAddingComment];
    addingCommentCurrent[index] = value;
    setIsAddingComment(addingCommentCurrent);
  };

  if (task && Array.isArray(task.subTasks) && task.subTasks.length) {
    subTasks = task.subTasks.map((subtask: any, index: number) => (
      <div key={subtask.title}>
        <Row>
          <Col span={18}>
            <Row>
              <Title level={2}>{subtask.category}</Title>
            </Row>
            <Row>
              <Title level={4}>{subtask.title}</Title>
            </Row>
            <Row>{subtask.description}</Row>
            <Divider />
            <Row>
              <CommentList
                setActiveButtons={setActiveButtons}
                taskScore={taskScore}
                setTaskScore={setTaskScore}
                review={review}
                setReview={setReview}
                dispute={dispute}
                setDispute={setDispute}
                subTaskIndex={index}
                isAddingComment={isAddingComment}
                setIsAddingComment={setIsAddingComment}
                stage={stage}
              />
            </Row>
          </Col>
          <Col span={6} className={classes.scoreSection}>
            <Statistic
              title="Score"
              value={reviewMarks[index] || 'No data'}
              suffix={`/ ${maxMarks[index] || 'No data'}`}
            />
            <Button
              disabled={!activeButtons[index]}
              danger
              className={classes.argueBtn}
              onClick={() => commentButtonHandler(index, true)}
            >
              Dispute
            </Button>
          </Col>
        </Row>
      </div>
    ));
  }
  return (
    <Content className={classes.content}>
      {subTasks}
      <Row>
        <Col span={18} className={classes.sendBtn}>
          <Button size="large" type="primary" block onClick={sendCommentsToBD}>
            Send
          </Button>
        </Col>
      </Row>
      <Feedback feedbacks={database.feedbacks} />
    </Content>
  );
};
const mapStateToProps = (state: any) => ({
  taskId: state.taskId,
  checkSessionId: state.checkSessionId,
  taskScoreId: state.taskScoreId,
  reviewId: state.reviewId,
  disputeId: state.disputeId,
});

export default connect(mapStateToProps)(Dispute);
