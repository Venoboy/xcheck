import React from 'react';
import { Comment } from 'antd';

const CustomComment = (props: any) => {
  const { textComment, author } = props;
  return <Comment author={<span>{author}</span>} content={textComment} />;
};

export default CustomComment;
