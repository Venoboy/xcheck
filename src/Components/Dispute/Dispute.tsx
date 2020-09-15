import React, { useState } from 'react';
import { Button, Col, Divider, Input, Layout, Rate, Row, Statistic, Typography } from 'antd';
import { connect } from 'react-redux';

import classes from './Dispute.module.scss';
// import getFromBD from '../../Service/getFromBD';
import CommentList from '../CommentList/CommentList';
import getAsyncInfo from './getAsyncInfo';

const { Title }: any = Typography;
const { Content }: any = Layout;
const { TextArea }: any = Input;

// getFromBD('tasks').then(console.log);

const Dispute = (props: any) => {
  const { user, taskId } = props;
  const [task, setTask] = useState([] as any);
  getAsyncInfo(setTask, taskId);
  let subTasks = null;
  if (Array.isArray(task.subTasks) && task.subTasks.length) {
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
              <CommentList user={user} subTaskIndex={index} taskId={task.id} />
            </Row>
            <Row>
              <TextArea placeholder="Enter comment" autoSize />
            </Row>
          </Col>
          <Col span={6} className={classes.scoreSection}>
            <Statistic title="Score" value={10} suffix="/ 20" />
            <Button danger className={classes.argueBtn}>
              Оспорить
            </Button>
          </Col>
        </Row>
      </div>
    ));
  }
  const renderedComponent = (
    <Content className={classes.content}>
      {subTasks}
      <Row>
        <Col className={classes.review} span={18}>
          <Title level={4}>Отзыв о проверяющем</Title>
          <Rate className={classes.rate} />
          <TextArea className={classes.textArea} placeholder="Add review" autoSize />
        </Col>
      </Row>
    </Content>
  );
  return renderedComponent;
};

const mapStateToProps = (state: any) => ({
  taskId: state.currentState.taskId,
  user: state.currentState.user,
  state,
});

export default connect(mapStateToProps)(Dispute);
