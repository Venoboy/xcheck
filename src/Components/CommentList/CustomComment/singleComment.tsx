import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

const singleComment = (props: any) => {
  const { value, author, setOnEdit, avatar, isEditable } = props;
  return {
    author,
    avatar,
    content: (
      <Text
        editable={
          isEditable
            ? {
                onChange: setOnEdit,
              }
            : false
        }
      >
        {value}
      </Text>
    ),
  };
};

export default singleComment;
