import React, { useState, useEffect } from 'react';
import { Typography, Button, Col, InputNumber, Row, Slider } from 'antd';
import { CommentComponent } from '../../../comment/comment';
import './subtask.scss';

const { Text, Title } = Typography;
type SubtaskTypes = {
  item: any;
  index: any;
  taskScore: { subTasks: Array<{ score: string; comment: string }> };
  createSubTaskScoreObject: (index: number, key: string, value: string | number) => void;
  shouldShowCategory: boolean;
};

export const Subtask = ({
  item,
  index,
  createSubTaskScoreObject,
  shouldShowCategory,
  taskScore,
}: SubtaskTypes) => {
  console.log('taskScore in SUBTASK', taskScore);
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(+taskScore?.subTasks[index]?.score);
  }, [taskScore, index]);
  return (
    <div className="subtask__container">
      {shouldShowCategory ? (
        <Title level={3} key={index}>
          {item.category}
        </Title>
      ) : null}
      <p>
        <Text key={index}>{item.description}</Text>
      </p>
      <Row>
        <Col span={12}>
          <Slider
            min={item.score < 0 ? item.score : 0}
            max={item.score < 0 ? 0 : item.score}
            onChange={(value: any) => {
              setScore(value);
              createSubTaskScoreObject(index, 'score', score);
            }}
            value={score}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={item.score < 0 ? item.score : 0}
            max={item.score < 0 ? 0 : item.score}
            style={{ margin: '0 16px' }}
            value={score}
            onChange={(value: any) => {
              setScore(value);
              createSubTaskScoreObject(index, 'score', score);
            }}
          />
        </Col>
      </Row>

      <div className="comment__container">
        <p>Комментарий:</p>
        <CommentComponent
          createSubTaskScoreObject={createSubTaskScoreObject}
          index={index}
          clickedBefore={taskScore?.subTasks[index]?.comment !== ''}
          text={taskScore?.subTasks[index]?.comment}
        />
      </div>
      <div className="buttons_for_review">
        <Button
          type="primary"
          onClick={() => {
            setScore(item.score);
            createSubTaskScoreObject(index, 'score', item.score);
          }}
        >
          Полностью
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setScore(item.score / 2);
            createSubTaskScoreObject(index, 'score', item.score / 2);
          }}
        >
          Частично
        </Button>
        <Button
          type="primary"
          onClick={() => {
            setScore(0);
            createSubTaskScoreObject(index, 'score', '0');
          }}
        >
          Не выполнено
        </Button>
      </div>
    </div>
  );
};
