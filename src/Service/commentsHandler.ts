import getFromBD from './getFromBD';

const commentsHandler = () => {
  let comments = {};
  comments = getFromBD('/');
  return comments;
};

export default commentsHandler;
