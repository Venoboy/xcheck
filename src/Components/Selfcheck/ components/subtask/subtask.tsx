import React from 'react';
import { Typography, Checkbox } from 'antd';
import { ButtonReview } from '../buttons/buttonReview';
import { App } from '../../../comment/comment';
import './subtask.scss';

const { Text, Title } = Typography;

export const Subtask = ({ item, onChange, index }: any) => {
  return (
    <div className="subtask__container">
      <Title level={3} key={index}>
        {item.category}
      </Title>
      <p>
        <Checkbox onChange={onChange} />
        <Text key={index}>{item.description}</Text>
      </p>
      <div className="comment__container">
        <App />
      </div>
      <div className="buttons_for_review">
        <ButtonReview text="Полностью" handleClick={() => console.log('100')} />
        <ButtonReview text="Частично" handleClick={() => console.log('50')} />
        <ButtonReview text="Не выполнено" handleClick={() => console.log('0')} />
      </div>
    </div>
  );
};
