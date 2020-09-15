import * as React from 'react';
import { Descriptions, Collapse, Slider, InputNumber, Row, Col, Comment } from 'antd';

import { Task, TaskItem, TaskScore } from '../Reducer/reducer';
import './TaskReview.scss';

export type TaskReviewProps = {
  task?: Task;
  taskScore?: TaskScore;
};

const { Panel } = Collapse;
const { Item } = Descriptions;

const taskStub = {
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
} as Task;

const taskScoreStub = {
  task: 'simple-task-v1',
  items: {
    basic_p1: { score: 20, comment: 'Well done!' },
    extra_p1: { score: 15, comment: 'Some things are done, some are not' },
    fines_p1: { score: 0, comment: 'No ticket today' },
  },
} as TaskScore;

export const TaskReview: React.FC<TaskReviewProps> = ({
  task = taskStub,
  taskScore = taskScoreStub,
}) => {
  const categories = task.categoriesOrder.reduce((acc, category) => {
    return {
      ...acc,
      [category]: [],
    };
  }, Object.create(null));
  Object.keys(categories).forEach(category => {
    categories[category] = task.items.filter(item => item.category === category);
  });

  return (
    <div id="task-review">
      <Descriptions title={task.id}>
        <Item label="Author">{task.author}</Item>
        <Item label="State">{task.state}</Item>
      </Descriptions>
      <Collapse>
        {Object.entries(categories).map(([category, items]) => (
          <Panel header={category} key={category}>
            {(items as TaskItem[]).map(item => (
              <div key={item.id}>
                <Descriptions title={item.title}>
                  <Item label="Description">{item.description}</Item>
                </Descriptions>
                <Row>
                  <Col span={12}>
                    <Slider
                      min={item.minScore}
                      max={item.maxScore}
                      onChange={console.log}
                      value={taskScore.items[item.id].score}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={item.minScore}
                      max={item.maxScore}
                      style={{ margin: '0 16px' }}
                      value={taskScore.items[item.id].score}
                      onChange={console.log}
                    />
                  </Col>
                </Row>
                <Comment
                  className="task-review-comment"
                  content={taskScore.items[item.id].comment}
                />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};
