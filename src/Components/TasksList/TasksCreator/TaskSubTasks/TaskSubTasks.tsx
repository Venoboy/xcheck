import React from 'react';
import { Button, Col, Divider, Form, Input, Row, Select, Checkbox } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';

import classes from './TaskSubTasks.module.scss';

const TaskSubTasks: React.FC = () => {
  const { Option } = Select;
  const taskTypes = ['Basic', 'Advanced', 'Extra', 'Fine'];
  return (
    <Form.List name="tasks">
      {(fields, { add, remove }) => {
        return (
          <div>
            <Divider>Subtasks</Divider>
            <ol>
              {fields.map((field) => (
<<<<<<< HEAD:src/Components/TaskSubTasks/TaskSubTasks.tsx
                <li className="subtask-list-item" key={field.key}>
=======
                <li
                  className={classes.subtaskListItem}
                  key={field.key}
                  style={{ borderBottom: 'solid 1px grey', marginTop: '15px' }}
                >
>>>>>>> e921de90012097c389cb2479d4a25f8e967e0ada:src/Components/TasksList/TasksCreator/TaskSubTasks/TaskSubTasks.tsx
                  <Form.Item
                    {...field}
                    wrapperCol={{ span: 22 }}
                    key={field.key}
                    name={[field.name, 'subtask-item']}
                    fieldKey={[field.fieldKey, 'subtask-item']}
                  >
                    <Row justify="space-between">
                      <Col span={14} offset={1}>
                        <Form.Item
                          name={[field.name, 'title']}
                          rules={[{ required: true, message: 'Missing Subtask' }]}
                          label="Subtask"
                        >
                          <Input placeholder="Subtask" />
                        </Form.Item>
                        <Form.Item
                          name={[field.name, 'description']}
                          rules={[{ required: false }]}
                          label="Description"
                        >
                          <Input.TextArea
                            placeholder="Description"
                            autoSize={{ minRows: 4, maxRows: 10 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          style={{ marginLeft: '15px' }}
                          name={[field.name, 'score']}
                          rules={[{ required: true, message: 'Missing Cost' }]}
                          label="Cost Subtask"
                        >
                          <Input type="number" placeholder="Cost" />
                        </Form.Item>
                        <Form.Item
                          style={{ marginLeft: '15px' }}
                          name={[field.name, 'category']}
                          rules={[{ required: true, message: 'Missing Type Task' }]}
                          label="Type Task"
                        >
                          <Select
                            showSearch
                            placeholder="Select Type Task"
                            optionFilterProp="children"
                          >
                            {taskTypes.map((taskType) => (
                              <Option key={taskType} value={taskType}>
                                {taskType}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        <Form.Item
                          style={{ marginLeft: '15px' }}
                          valuePropName="checked"
                          name={[field.name, 'mentorCheck']}
                          initialValue={false}
                        >
                          <Checkbox>Only Mentor?</Checkbox>
                        </Form.Item>
                      </Col>
                      <Col>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                          style={{
                            marginLeft: '15px',
                            marginTop: '60px',
                            fontSize: '20px',
                            color: 'red',
                          }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </li>
              ))}
            </ol>

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => {
                  add();
                }}
                block
              >
                <PlusOutlined />
                Add subtask
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
};

export default TaskSubTasks;
