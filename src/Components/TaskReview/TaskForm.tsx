import React from 'react';
import { Collapse, Descriptions } from 'antd';
import { TaskItem } from '../../Reducer/reducer';
import { SetTaskScore } from './SetScore';

const { Panel } = Collapse;
const { Item } = Descriptions;

export const TaskReviewForm: React.FC<{
  taskName: string;
  taskAuthor: string;
  taskState: string;
  categories: [string, TaskItem[]];
  onScoreChange: (taskId: number | string, score: number, category: string) => void;
}> = ({ taskName, taskAuthor, taskState, categories, onScoreChange }) => {
  return (
    <>
      <Descriptions title={taskName}>
        <Item label="Author">{taskAuthor}</Item>
        <Item label="State">{taskState}</Item>
      </Descriptions>
      <Collapse>
        {Object.entries(categories).map(([category, items]) => (
          <Panel header={category} key={category}>
            {(items as TaskItem[]).map((item) => (
              <div key={item.id}>
                <Descriptions title={item.title}>
                  <Item label="Description">{item.description}</Item>
                </Descriptions>
                <SetTaskScore
                  score={item.score}
                  maxScore={item.maxScore}
                  minScore={item.minScore}
                  onChange={(value) => onScoreChange(item.id, value as number, category)}
                />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </>
  );
};
