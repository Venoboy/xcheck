import React from 'react';
import 'antd/dist/antd.css';
import { Button } from 'antd';

type PropTypes = {
  text: string;
  handleClick: () => void;
};

export const ButtonSelfcheck = ({ text, handleClick }: PropTypes) => {
  return (
    <Button type="primary" onClick={handleClick}>
      {text}
    </Button>
  );
};
