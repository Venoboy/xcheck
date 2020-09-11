import React from 'react';
import { Button, Col, Divider, Input, Layout, Rate, Row, Statistic, Typography } from 'antd';
import { connect } from 'react-redux';

import classes from './Dispute.module.scss';
import { stateType, subTaskType } from '../../TsTypes/types';

const { Text, Title }: any = Typography;
const { Content }: any = Layout;
const { TextArea }: any = Input;

interface disputeType {
  isActive: boolean;
  task: any;
}

const Dispute: React.FC<any> = (props: disputeType) => {
  const { isActive } = props;
  console.log(props.task);
  const subtasks = props.task.subTasks.map((subtask: subTaskType) => (
    <div key={subtask.id}>
      <Row>
        <Col span={18}>
          <Row>
            <Title level={2}>Текст задачи</Title>
          </Row>
          <Row>{subtask.description}</Row>
          <Divider />
          <Row>
            <Title level={4}>Комментарий ученика</Title>
          </Row>
          <Row>
            <Text>Я все сделал правильно!</Text>
          </Row>
          <Divider />
          <Row>
            <Title level={4}>Комментарий проверяющего</Title>
          </Row>
          <Row>Все поехало по бороде!</Row>
          <Divider />
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
  const renderedComponent = (
    <Content className={classes.content}>
      {subtasks}
      <Row>
        <Col className={classes.review} span={18}>
          <Title level={4}>Отзыв о проверяющем</Title>
          <Rate className={classes.rate} />
          <TextArea className={classes.textArea} placeholder="Add review" autoSize />
        </Col>
      </Row>
    </Content>
  );
  return isActive ? renderedComponent : null;
};

const mapStateToProps = (state: stateType) => ({
  task: state.task,
});

export default connect(mapStateToProps)(Dispute);
