/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Subtask } from './ components/subtask/subtask';
import { Typography, Checkbox } from 'antd';
import Header from '../Header/Header';
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
      description: 'You need to make things right, not wrong',
    },
    {
      id: 'extra_p1',
      minScore: 0,
      maxScore: 30,
      category: 'Extra Scope',
      title: 'More awesome things',
      description: 'Be creative and make up some more awesome things',
    },
    {
      id: 'fines_p1',
      minScore: -10,
      maxScore: 0,
      category: 'Fines',
      title: 'App crashes',
      description: 'App causes BSoD!',
    },
  ],
};

export const Selfcheck = () => {
  function onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  return (
    <div className="selfcheck_container">
      <Header />
      <Title level={1} key={task.id}>
        {task.id}
      </Title>
      {task.items.map((item, index) => (
        <>
          <Subtask item={item} index={index} onChange={onChange} />
        </>
      ))}
    </div>
  );
};
