import React, { useEffect, useState } from 'react';
import { Button, Col, Divider, Input, Layout, Rate, Row, Statistic, Typography } from 'antd';
import { connect } from 'react-redux';

import classes from './Dispute.module.scss';
import activeBtnHandler from './helpFunctions/activeBtnHadler';
import CommentList from '../CommentList/CommentList';
import getAsyncInfo from './helpFunctions/getAsyncInfo';
import stages from '../CommentList/stages';
import getFromBD from '../../Service/getFromBD';
import putToBD from '../../Service/putToBD';

const { Title }: any = Typography;
const { Content }: any = Layout;
const { TextArea }: any = Input;

// getFromBD('tasks').then(console.log);

const Dispute = (props: any) => {
  const { user, taskId } = props;
  const [task, setTask] = useState([] as any);
  const [isAddingComment, setIsAddingComment] = useState([] as any);
  const [activeButtons, setActiveButtons] = useState([] as any);
  const [taskScore, setTaskScore] = useState({
    index: -2,
    object: {},
  });

  useEffect(() => {
    const fetchTaskScores = async () => {
      const result = await getFromBD('/taskScores');
      const taskScr: any = result.find((elem: any) => {
        return elem.userId === user && elem.taskId === taskId;
      });
      const taskScrIndex: number = result.findIndex((elem: any) => {
        return elem.userId === user && elem.taskId === taskId;
      });
      setTaskScore({
        index: taskScrIndex,
        object: taskScr,
      });
      // console.log(result);
    };
    fetchTaskScores();
  }, [user, taskId]);
  // console.log(taskScores);

  useEffect(() => {
    if (!task.subTasks) {
      getAsyncInfo(setTask, taskId);
    }
  }, [task, taskId]);

  const sendCommentsToBD = () => {
    putToBD(`taskScores/${taskScore.index}`, taskScore.object);
  };

  if (activeButtons.length === 0) {
    activeBtnHandler(setActiveButtons, taskId).then(() => {
      // console.log(activeButtons);
    });
  }

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
                subTaskIndex={index}
                isAddingComment={isAddingComment}
                setIsAddingComment={setIsAddingComment}
                stage={stages.disputeCheck}
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
  taskId: state.currentState.taskId,
  user: state.currentState.user,
});

export default connect(mapStateToProps)(Dispute);
