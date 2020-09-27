import React from 'react';
import { List, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  CodeTwoTone,
  CheckCircleTwoTone,
  FrownTwoTone,
  OrderedListOutlined,
  SnippetsTwoTone,
  TrophyTwoTone,
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
  {
    name: 'Score',
    path: '/score',
    icon: <TrophyTwoTone twoToneColor="rgb(255, 18, 18)" />,
  },
  {
    name: 'Review Requests',
    path: '/review-requests',
    icon: <SnippetsTwoTone twoToneColor="#3ff4a1" />,
  },
  {
    name: 'Check Session',
    path: '/checksession',
    icon: <SnippetsTwoTone twoToneColor="#4af81e" />,
  },
];

interface navBarType {
  role: any;
}

const Navbar: React.FC<navBarType> = (props) => {
  const { role } = props;
  const isStudent = role.length === 1 && role.includes('student');
  const isAuthor = role.includes('author');
  const dataForStudent = data.filter(
    (item) => item.name !== 'Tasks List' && item.name !== 'Check Session'
  );
  const dataWithCrossCheck = data.filter((item) => item.name !== 'Check Session');
  const { Text, Title } = Typography;
  const history = useHistory();

  return (
    <div className="navbar">
      <Title level={1}>Navigation</Title>
      <List
        bordered
        dataSource={isStudent ? dataForStudent : isAuthor ? data : dataWithCrossCheck}
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
