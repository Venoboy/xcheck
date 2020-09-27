import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, message, Rate, Row, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons/lib';

import classes from './Feedback.module.scss';
import AddComment from '../../CommentList/CustomComment/AddComment';
import putToDB from '../../../Service/putToDB';
import postToDB from '../../../Service/postToDB';

const { Title, Text } = Typography;

const Feedback = (props: any) => {
  const { disputeId, feedbacks } = props;
  const [value, setValue] = useState('');
  const [feedback, setFeedback] = useState({} as any);
  const [starCount, setStarCount] = useState(0);
  const [canBeDeleted, setCanBeDeleted] = useState(false);
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const isFeedback = Object.keys(feedback).length > 0;
  const isTextFeedback = isFeedback && feedback.comment;
  const feedbackId = feedbacks
    ? Object.keys(feedbacks).find((id) => feedbacks[id].disputeId === disputeId)
    : false;

  const isFeedDeletable = isFeedback && (feedback.comment || feedback.rate);

  useEffect(() => {
    if (feedbackId && feedbacks && feedbacks[feedbackId]) {
      setFeedback(feedbacks[feedbackId]);
      setStarCount(feedbacks[feedbackId].rate);
    }
    // eslint-disable-next-line
  }, [feedbackId, disputeId]);

  const starHandler = (count: number) => {
    setStarCount(count);
  };

  const handleSubmit = () => {
    setFeedback((oldFeedback: any) => ({
      ...oldFeedback,
      comment: value,
      rate: starCount,
    }));
    if (feedbackId) {
      putToDB(`feedbacks/${feedbackId}`, {
        disputeId,
        comment: value,
        rate: starCount,
      });
    } else {
      postToDB('feedbacks', {
        disputeId,
        comment: value,
        rate: starCount,
      });
    }
  };

  const deleteFeed = () => {
    setStarCount(0);
    setValue('');
    setCanBeDeleted(true);
    message.info('Feedback deleted');
  };

  useEffect(() => {
    if (canBeDeleted) {
      handleSubmit();
      setCanBeDeleted(false);
    }
    // eslint-disable-next-line
  }, [canBeDeleted]);

  const text = <Text>{feedback.comment}</Text>;
  return (
    <Row>
      <Col className={classes.review} span={18}>
        <Title level={4}>Feedback to reviewer</Title>
        <Rate className={classes.rate} value={starCount} onChange={starHandler} />
        {isTextFeedback ? (
          text
        ) : (
          <AddComment value={value} onChange={handleChange} onSubmit={handleSubmit} />
        )}
        {isFeedDeletable ? (
          <DeleteOutlined className={classes.deleteFeed} onClick={deleteFeed} />
        ) : null}
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: any) => ({
  disputeId: state.disputeId,
});

export default connect(mapStateToProps)(Feedback);
