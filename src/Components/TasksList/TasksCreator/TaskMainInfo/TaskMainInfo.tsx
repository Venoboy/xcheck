import React from 'react';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons/lib';
import { connect } from 'react-redux';

interface TasksMainInfoProps {
  userName: string | null;
}

const TaskMainInfo: React.FC<TasksMainInfoProps> = (props) => {
  const { userName } = props;
  const { Option } = Select;
  const taskStates = ['DRAFT', 'PUBLISHED', 'ARCHIVED'];

  return (
    <Row>
      <Col span={12}>
        <Form.Item
          label="Task Name"
          name="taskName"
          rules={[{ required: true, message: 'Please enter Task Name' }]}
        >
          <Input placeholder="Enter Task Name" suffix={<EditOutlined />} />
        </Form.Item>
        <Form.Item
          label="Author"
          name="authorName"
          rules={[{ required: true }]}
          initialValue={userName}
        >
          <Input placeholder="Author" suffix={<EditOutlined />} />
        </Form.Item>
        <Form.Item
          name="typeState"
          rules={[{ required: true, message: 'Missing State Task' }]}
          label="State Task"
          initialValue="DRAFT"
        >
          <Select showSearch placeholder="Select Type Task" optionFilterProp="children">
            {taskStates.map((state) => (
              <Option key={state} value={state}>
                {state}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col span={8} offset={4}>
        <Button
          size="small"
          type="dashed"
          shape="round"
          style={{ marginBottom: '14px', width: '200px' }}
        >
          Import RSS Checklist
        </Button>
        <br />
        <Button
          size="small"
          type="dashed"
          shape="round"
          style={{ marginBottom: '14px', width: '200px' }}
        >
          Import Markdown
        </Button>
        <br />
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{ marginBottom: '14px', width: '200px' }}
        >
          Import Json
        </Button>
        <Button
          size="small"
          type="primary"
          shape="round"
          style={{ marginBottom: '14px', width: '200px' }}
        >
          Export Json
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userName: state.user.userName,
  };
};

export default connect(mapStateToProps)(TaskMainInfo);
