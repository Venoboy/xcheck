import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Descriptions, Collapse, Slider, InputNumber, Row, Col, Comment, Select } from 'antd';
import { Task, TaskItem, Tasks, TaskStates } from '../Reducer/reducer';
import './TaskReview.scss';
import Header from '../Components/Header/Header';
import Hoc from '../Components/Hoc/Hoc';
import Service from '../Service/Service';

const { Option } = Select;
const { Panel } = Collapse;
const { Item } = Descriptions;

export const TaskReview: React.FC = Hoc()(({ ...params }) => {
  const [task, setTask] = useState<Task>({
    name: '',
    id: '',
    author: '',
    state: TaskStates.DRAFT,
    categoriesOrder: [],
    subTasks: [],
  });
  const { service } = params as { service: Service };
  const categories = task.subTasks.reduce((acc, cur) => {
    return {
      ...acc,
      [cur.category]: [],
    };
  }, Object.create(null));
  Object.keys(categories).forEach((category) => {
    categories[category] = task?.subTasks.filter((item) => item.category === category);
  });
  const [tasks, setTasks] = useState<Tasks>({});
  useEffect(() => {
    service.getAllTasks().then((response) => setTasks(response as Tasks));
  }, []);
  const onTaskSelect = useCallback(
    (taskId: string) => {
      setTask(tasks[taskId]);
    },
    [setTask, tasks]
  );

  return (
    <div id="task-review">
      <Header />

      <Select className="task-review-select" onChange={onTaskSelect}>
        {Object.entries(tasks).map(([key, el]) => {
          return (
            <Option key={key} value={key}>
              {el.name}
            </Option>
          );
        })}
      </Select>

      <Descriptions title={task.id}>
        <Item label="Author">{task.author}</Item>
        <Item label="State">{task.state}</Item>
      </Descriptions>
      <Collapse>
        {Object.entries(categories).map(([category, items]) => (
          <Panel header={category} key={category}>
            {(items as TaskItem[]).map((item) => (
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
                      value={item.score}
                    />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={item.minScore}
                      max={item.maxScore}
                      style={{ margin: '0 16px' }}
                      value={item.score}
                      onChange={console.log}
                    />
                  </Col>
                </Row>
                <Comment className="task-review-comment" content="item comment" />
              </div>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
});
