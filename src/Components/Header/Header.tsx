import React from 'react';
import { Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Header.scss';

const Header = (props: any) => {
  const { user } = props;
  return (
    <header>
      <div className="logo" />
      <b>X-Check</b>
      <div className="profile">
        <Avatar size={30} style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
        <p>{user}</p>
      </div>
    </header>
  );
};

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Header);
