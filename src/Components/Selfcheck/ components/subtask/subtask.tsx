import React from 'react';
import { Typography, Checkbox, Button } from 'antd';
import { CommentComponent } from '../../../comment/comment';
import './subtask.scss';

const { Text, Title } = Typography;
type SubtaskTypes = {
  item: any;
  onChange: any;
  index: any;
  // taskScore: any;
  createSubTaskScoreObject: (index: number, key: string, value: string | number) => void;
  shouldShowCategory: boolean;
};

export const Subtask = ({
  item,
  onChange,
  index,
  createSubTaskScoreObject,
  shouldShowCategory,
}: SubtaskTypes) => {
  return (
    <div className="subtask__container">
      {shouldShowCategory ? (
        <Title level={3} key={index}>
          {item.category}
        </Title>
      ) : null}
      <p>
        <Checkbox onChange={onChange} />
        <Text key={index}>{item.description}</Text>
      </p>
      <div className="comment__container">
        <CommentComponent createSubTaskScoreObject={createSubTaskScoreObject} index={index} />
      </div>
      <div className="buttons_for_review">
        <Button type="primary" onClick={() => createSubTaskScoreObject(index, 'score', item.score)}>
          Полностью
        </Button>
        <Button
          type="primary"
          onClick={() => createSubTaskScoreObject(index, 'score', item.score / 2)}
        >
          Частично
        </Button>
        <Button type="primary" onClick={() => createSubTaskScoreObject(index, 'score', '0')}>
          Не выполнено
        </Button>
      </div>
    </div>
  );
};
