/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Typography, Checkbox } from 'antd';
import Header from '../Header/Header';
import { ButtonReview } from './ components/buttons/buttonReview';
import { App } from './ components/comment/comment';
import './Selfcheck.scss';

const { Text, Title } = Typography;

const task = {
  id: 'simple-task-v1',
  author: 'cardamo',
  state: 'DRAFT',
  categoriesOrder: ['Basic Scope', 'Extra Scope', 'Fines'],
  items: [
    {
      id: 'basic_p1',
      minScore: 0,
      maxScore: 20,
      category: 'Basic Scope',
      title: 'Basic things',
      description: 'You need to make things right, not wrong'
    },
    {
      id: 'extra_p1',
      minScore: 0,
      maxScore: 30,
      category: 'Extra Scope',
      title: 'More awesome things',
      description: 'Be creative and make up some more awesome things'
    },
    {
      id: 'fines_p1',
      minScore: -10,
      maxScore: 0,
      category: 'Fines',
      title: 'App crashes',
      description: 'App causes BSoD!'
    }
  ]
};

export const Selfcheck = () => {
  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div className="selfcheck_container">
      <Header />
      {task.items.map((item, index) => (
        <>
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
          <ButtonReview text="Полностью" handleClick={() => console.log('100')} />
          <ButtonReview text="Частично" handleClick={() => console.log('50')} />
          <ButtonReview text="Не выполнено" handleClick={() => console.log('0')} />
        </>
      ))}
    </div>
  );
};
