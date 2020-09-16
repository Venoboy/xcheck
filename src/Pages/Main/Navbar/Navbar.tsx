import React from 'react';
import { List, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  CalendarTwoTone,
  CodeTwoTone,
  CheckCircleTwoTone,
  FrownTwoTone,
  FormOutlined,
} from '@ant-design/icons';
import './Navbar.scss';

const data = [
  {
    name: 'Tasks List',
    path: '/tasks-list',
    icon: <CalendarTwoTone twoToneColor="rgb(245, 97, 97)" />,
  },
  {
    name: 'Submit Task',
    path: '/submit-task',
    icon: <CodeTwoTone twoToneColor="rgb(24, 144, 255)" />,
  },
  {
    name: 'Task Review',
    path: '/task-review',
    icon: <CheckCircleTwoTone twoToneColor="rgb(245, 97, 97)" />,
  },
  {
    name: 'Dispute',
    path: '/dispute',
    icon: <FrownTwoTone twoToneColor="rgb(137, 184, 44)" />,
  },
  {
    name: 'All Tasks',
    path: '/all-tasks',
    icon: <FormOutlined twoToneColor="rgb(137, 184, 44)" />,
  },
];

const Navbar: React.FC = () => {
  const { Text, Title } = Typography;
  const history = useHistory();

  return (
    <div className="navbar">
      <Title level={1}>Navigation</Title>
      <List
        bordered
        dataSource={data}
        renderItem={(item) => (
          <List.Item onClick={() => history.push(item.path)}>
            <Text>
              {item.icon}
              {item.name}
            </Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Navbar;
