import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Select, Spin, Space } from 'antd';
import { authGithub, getAccessCode } from '../../Actions/authGithub';
import { REQUESTS, STOP_LOADING } from '../../Actions/actionTypes';
import classes from './Auth.module.scss';

const { Option } = Select;

interface AuthType {
  auth: Function;
  startLoading: Function;
  stopLoading: Function;
  loaded: boolean;
}

const Auth: React.FC<any> = (props: AuthType) => {
  const roles = ['Author', 'Student', 'Supervisor', 'Course manager'];
  const history = useHistory();

  const renderSelectOptions = () => {
    return roles.map((text: string, index: number) => {
      const num = index;
      return (
        <Option key={num} value={text}>
          {text}
        </Option>
      );
    });
  };

  const handleSelectOptions = (value: string) => {
    localStorage.setItem('role', value);
  };

  if (!localStorage.getItem('wasRedirected')) {
    localStorage.setItem('wasRedirected', 'no');
    localStorage.setItem('role', 'Student');
  }

  if (localStorage.getItem('wasRedirected') === 'no') {
    return (
      <div className={classes.Auth__Wrapper}>
        <div className={classes.Auth}>
          <h1>Welcome to OAuth</h1>
          <Select
            className={classes.Auth__Select}
            mode="tags"
            placeholder="Select your role"
            onChange={handleSelectOptions}
          >
            {renderSelectOptions()}
          </Select>

          <Button className={classes.Auth__Button} type="primary" onClick={() => getAccessCode()}>
            Sign up with Github
          </Button>
        </div>
      </div>
    );
  }

  if (localStorage.getItem('wasRedirected') === 'yes') {
    const { auth, loaded, startLoading, stopLoading } = props;
    const userRole = localStorage.getItem('role');

    if (!loaded) {
      return (
        <div className={classes.Auth__Wrapper}>
          <div className={classes.Auth}>
            <p className={classes.Auth__Text}>Press button to complite Authorization</p>
            <Button
              className={classes.Auth__Button}
              type="primary"
              onClick={async () => {
                startLoading();
                await auth(userRole);
                stopLoading();
                history.push('/');
              }}
            >
              Finish
            </Button>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.Auth__Wrapper}>
        <div className={classes.Auth}>
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      </div>
    );
  }

  return null;
};

function mapStateToProps(state: any) {
  return {
    loaded: state.loaded,
  };
}

function mapDispatchToProps(dispatch: Function) {
  return {
    auth: (userRole: string) => dispatch(authGithub(userRole)),
    startLoading: () => dispatch({ type: REQUESTS }),
    stopLoading: () => dispatch({ type: STOP_LOADING }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
