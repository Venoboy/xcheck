import React, { useState, useEffect } from 'react';
import { Typography, Button, Col, InputNumber, Row, Slider, Divider } from 'antd';
import { CommentComponent } from './comment';
import './subtasks.scss';

const { Text, Title } = Typography;
type SubtaskTypes = {
  item: any;
  index: any;
  taskScore: { subTasks: Array<{ score: string; comment: string }> };
  createSubTaskScoreObject: (index: number, key: string, value: string | number) => void;
  shouldShowCategory: boolean;
  updateIsCanBeSubmitted: any;
};

export const Subtask = ({
  item,
  index,
  createSubTaskScoreObject,
  shouldShowCategory,
  taskScore,
  updateIsCanBeSubmitted,
}: SubtaskTypes) => {
  const [score, setScore] = useState(0);
  useEffect(() => {
    setScore(+taskScore?.subTasks[index]?.score);
    const isComplited = taskScore?.subTasks.every((el) => el.score !== '');
    if (isComplited) {
      updateIsCanBeSubmitted(true);
    }
  }, [taskScore, index, updateIsCanBeSubmitted]);
  return (
    <div className="subtask__container">
      {shouldShowCategory ? <Divider>{item.category}</Divider> : null}
      <Title level={4} key={`a${index}`}>
        {item.title}
      </Title>
      <Text key={`b${index}`}>{item.description}</Text>
      <Row>
        <Col span={12}>
          <Slider
            min={item.score < 0 ? item.score : 0}
            max={item.score < 0 ? 0 : item.score}
            onChange={(value: any) => {
              setScore(value);
              createSubTaskScoreObject(index, 'score', value);
            }}
            value={!score ? 0 : score}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            min={item.score < 0 ? item.score : 0}
            max={item.score < 0 ? 0 : item.score}
            style={{ margin: '0 16px' }}
            value={!score ? 0 : score}
            onChange={(value: any) => {
              setScore(value);
              createSubTaskScoreObject(index, 'score', value);
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
          key={`c${index}`}
          type="primary"
          onClick={() => {
            setScore(item.score);
            createSubTaskScoreObject(index, 'score', item.score);
          }}
        >
          Полностью
        </Button>
        <Button
          key={`d${index}`}
          type="primary"
          onClick={() => {
            setScore(item.score / 2);
            createSubTaskScoreObject(index, 'score', item.score / 2);
          }}
        >
          Частично
        </Button>
        <Button
          key={`e${index}`}
          type="primary"
          onClick={() => {
            setScore(0);
            createSubTaskScoreObject(index, 'score', '0');
          }}
        >
          Не выполнено
        </Button>
      </div>
      <Divider />
    </div>
  );
};
