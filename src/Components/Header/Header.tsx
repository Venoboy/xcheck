import React from 'react';
import { Avatar, Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Header.scss';

const Header = (props: any) => {
  const { user } = props;
  const history = useHistory();
  return (
    <header>
      <div className="logo" />
      <b>X-Check</b>
      <div className="profile">
        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <p>{user}</p>
      </div>
      <Button type="primary" onClick={() => history.push('/authorization')}>
        Выйти
      </Button>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user.userName,
  };
};

export default connect(mapStateToProps)(Header);
