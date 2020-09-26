import React, { useRef, useState, useEffect } from 'react';
import { Typography, Checkbox, InputNumber } from 'antd';
import { ButtonSelfcheck } from '../buttons/buttonReview';
import { App } from '../../../comment/comment';
import './subtask.scss';

const { Text, Title } = Typography;
type SubtaskTypes = {
  item: any;
  onChange: any;
  index: any;
  taskScore: any;
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
        <App createSubTaskScoreObject={createSubTaskScoreObject} index={index} />
      </div>
      <div className="buttons_for_review">
        <ButtonSelfcheck
          text="Полностью"
          handleClick={() => createSubTaskScoreObject(index, 'score', item.score)}
        />
        <ButtonSelfcheck
          text="Частично"
          handleClick={() => createSubTaskScoreObject(index, 'score', item.score / 2)}
        />
        <ButtonSelfcheck
          text="Не выполнено"
          handleClick={() => createSubTaskScoreObject(index, 'score', '0')}
        />
      </div>
    </div>
  );
};
