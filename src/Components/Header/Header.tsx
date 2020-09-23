import React from 'react';
import { Avatar, Button } from 'antd';
import { useHistory, Link } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Header.scss';

const Header = (props: any) => {
  const { user } = props;
  const history = useHistory();
  return (
    <header>
      <Link to="/">
        <div className="logo" />
      </Link>
      <b>X-Check</b>
      <div className="profile">
        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <p style={{ marginRight: '15px' }}>{user}</p>
        <Button
          type="primary"
          onClick={() => history.push('/authorization')}
          icon={<LogoutOutlined />}
        >
          Log Out
        </Button>
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.userName,
  };
};

export default connect(mapStateToProps)(Header);
