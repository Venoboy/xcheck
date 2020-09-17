import React from 'react';
import { Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons/lib';

import './TaskSubTasks.scss';

const TaskSubTasks = () => {
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
                <li className="subtask-list-item" key={field.key}>
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
                          name={[field.name, 'name-subtask']}
                          rules={[{ required: true, message: 'Missing Subtask' }]}
                          label="Subtask"
                        >
                          <Input.TextArea
                            placeholder="Subtask"
                            autoSize={{ minRows: 4, maxRows: 10 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          style={{ marginLeft: '15px' }}
                          name={[field.name, 'cost-subtask']}
                          rules={[{ required: true, message: 'Missing Cost' }]}
                          label="Cost Subtask"
                        >
                          <Input type="number" placeholder="Cost" />
                        </Form.Item>
                        <Form.Item
                          style={{ marginLeft: '15px' }}
                          name={[field.name, 'type-task']}
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
                      </Col>
                      <Col>
                        <MinusCircleOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                          style={{
                            marginLeft: '15px',
                            marginTop: '35px',
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
                  // console.log(fields);
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
