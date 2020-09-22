import React from 'react';
import { List, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  CodeTwoTone,
  CheckCircleTwoTone,
  FrownTwoTone,
  OrderedListOutlined,
} from '@ant-design/icons';
import './Navbar.scss';

const data = [
  {
    name: 'Tasks List',
    path: '/tasks-list',
    icon: <OrderedListOutlined twoToneColor="rgb(245, 97, 97)" />,
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
];

interface navBarType {
  role: any;
}

const Navbar: React.FC<navBarType> = (props) => {
  const { role } = props;
  const isStudent = role.length === 1 && role.includes('Student');
  const dataForStudent = data.filter((item) => item.name !== 'Tasks List');
  const { Text, Title } = Typography;
  const history = useHistory();

  return (
    <div className="navbar">
      <Title level={1}>Navigation</Title>
      <List
        bordered
        dataSource={isStudent ? dataForStudent : data}
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

const mapStatetoProps = (state: { user: { role: any } }) => {
  return {
    role: state.user.role,
  };
};

export default connect(mapStatetoProps)(Navbar);
