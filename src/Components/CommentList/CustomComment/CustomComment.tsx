import React from 'react';
import { Comment } from 'antd';

const CustomComment = (props: any) => {
  const { textComment, author } = props;
  let output: any = null;
  if (textComment) {
    output = <Comment author={<span>{author}</span>} content={textComment} />;
  }
  return output;
};

export default CustomComment;
