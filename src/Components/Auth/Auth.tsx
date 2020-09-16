import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Select } from 'antd';
import { authGithub, getAccessCode } from '../../Actions/authGithub';
import classes from './Auth.module.scss';

const { Option } = Select;

interface AuthType {
  auth: Function;
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
    );
  }

  if (localStorage.getItem('wasRedirected') === 'yes') {
    const { auth } = props;
    const userRole = localStorage.getItem('role');
    return (
      <div className={classes.Auth}>
        <p className={classes.Auth__Text}>Press button to complite Authorization</p>
        <Button
          className={classes.Auth__Button}
          type="primary"
          onClick={() => {
            auth(userRole);
            history.push('/');
          }}
        >
          Finish
        </Button>
      </div>
    );
  }

  return null;
};

function mapDispatchToProps(dispatch: Function) {
  return {
    auth: (userRole: string) => dispatch(authGithub(userRole)),
  };
}

export default connect(null, mapDispatchToProps)(Auth);
