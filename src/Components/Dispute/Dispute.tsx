import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Input, Layout, Rate, Row, Statistic, Typography } from 'antd';
import { connect } from 'react-redux';

import classes from './Dispute.module.scss';
import CommentList from '../CommentList/CommentList';
import stages from '../CommentList/stages';
import getFromBD from '../../Service/getFromBD';
import putToBD from '../../Service/putToBD';

const { Title }: any = Typography;
const { Content }: any = Layout;
const { TextArea }: any = Input;

const Dispute = (props: any) => {
  const { checkSessionId, taskScoreId, reviewId, disputeId } = props;
  const [database, setDatabase] = useState({} as any);
  const [isAddingComment, setIsAddingComment] = useState([] as any);
  const [activeButtons, setActiveButtons] = useState([] as any);
  const [taskScore, setTaskScore] = useState({} as any);
  const [review, setReview] = useState({} as any);
  const [dispute, setDispute] = useState({} as any);

  const isDatabaseEmpty = Object.keys(database).length === 0;
  const taskId = !isDatabaseEmpty
    ? database.checkSessions.find((elem: any) => elem.id === checkSessionId).taskId
    : false;

  const task = !isDatabaseEmpty ? database.tasks[taskId] : false;
  const stage = stages.disputeCheck;

  useEffect(() => {
    const fetchDB = async () => {
      setDatabase(await getFromBD(''));
    };
    if (isDatabaseEmpty) {
      fetchDB();
    }
  });

  useEffect(() => {
    if (!isDatabaseEmpty) {
      if (stage === stages.selfCheck && taskScore.subTasks) {
        setActiveButtons(taskScore.subTasks.map((elem: any) => elem.comment === ''));
      }
      if (stage === stages.reviewerCheck && review.subTasks) {
        setActiveButtons(review.subTasks.map((elem: any) => elem.comment === ''));
      }
      if (stage === stages.disputeCheck && dispute.subTasks) {
        setActiveButtons(dispute.subTasks.map((elem: any) => elem.comment === ''));
      }
    }
  }, [isDatabaseEmpty, taskScore, review, dispute, stage]);

  useEffect(() => {
    const isTaskScore = !isDatabaseEmpty && Object.keys(taskScore).length === 0;
    if (isTaskScore) {
      setTaskScore(database.taskScores[taskScoreId]);
    }
  }, [isDatabaseEmpty, taskScore, database, taskScoreId]);

  useEffect(() => {
    const isReview = !isDatabaseEmpty && Object.keys(review).length === 0;
    if (isReview) {
      setReview(database.reviews[reviewId]);
    }
  }, [isDatabaseEmpty, review, database, reviewId]);

  useEffect(() => {
    const isDispute = !isDatabaseEmpty && Object.keys(dispute).length === 0;
    if (isDispute) {
      setDispute(database.disputes[disputeId]);
    }
  }, [isDatabaseEmpty, dispute, database, disputeId]);

  const sendCommentsToBD = () => {
    if (stage === stages.selfCheck) {
      putToBD(`taskScores/${taskScoreId}`, taskScore);
    }
    if (stage === stages.reviewerCheck) {
      putToBD(`reviews/${reviewId}`, review);
    }
    if (stage === stages.disputeCheck) {
      putToBD(`disputes/${disputeId}`, dispute);
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
            <Statistic title="Score" value={10} suffix="/ 20" />
            <Button
              disabled={!activeButtons[index]}
              danger
              className={classes.argueBtn}
              onClick={() => commentButtonHandler(index, true)}
            >
              Оспорить
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
      <Row>
        <Col className={classes.review} span={18}>
          <Title level={4}>Отзыв о проверяющем</Title>
          <Rate className={classes.rate} />
          <TextArea className={classes.textArea} placeholder="Add review" autoSize />
        </Col>
      </Row>
    </Content>
  );
};
const mapStateToProps = (state: any) => ({
  checkSessionId: state.currentState.checkSessionId,
  taskScoreId: state.currentState.taskScoreId,
  reviewId: state.currentState.reviewId,
  disputeId: state.currentState.disputeId,
});

export default connect(mapStateToProps)(Dispute);
