import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Col, Dropdown, Menu, message, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import classes from './disputeSelector.module.scss';
import Header from '../../Header/Header';
import getFromDB from '../../../Service/getFromDB';
import postToDB from '../../../Service/postToDB';
import { DISPUTE_SELECT } from '../../../Actions/actionTypes';
import Dispute from '../Dispute';

const DisputeSelector = (props: any) => {
  const { userObject } = props;
  const [database, setDatabase] = useState({} as any);
  const [isDisputeSelectActive, setDisputeSelectActive] = useState(true);

  const isDatabaseEmpty = Object.keys(database).length === 0;

  const { checkSessions, reviewRequests, taskScores, reviews, disputes, tasks } = database;
  const user = userObject.githubId;

  useEffect(() => {
    const fetchDB = async () => {
      setDatabase(await getFromDB(''));
    };
    if (isDatabaseEmpty) {
      fetchDB();
    }
  });

  let userCheckSessionIds = [];

  if (!isDatabaseEmpty) {
    const reviewRequestIds = Object.keys(reviewRequests);
    const userReviewRequestIds = reviewRequestIds.filter((reviewRequestId) => {
      const isUserRequest = user === +reviewRequests[reviewRequestId].author;
      const isRequestPublished = reviewRequests[reviewRequestId].state === 'PUBLISHED';
      const taskScoreId = taskScores
        ? Object.keys(taskScores).find((elem, index) => {
            const values: any = Object.values(taskScores);
            return values[index].reviewRequestId === reviewRequestId;
          })
        : undefined;
      const reviewId = taskScoreId
        ? Object.keys(reviews).find((elem, index) => {
            const values: any = Object.values(reviews);
            return values[index].taskScoreId === taskScoreId;
          })
        : undefined;
      return isUserRequest && isRequestPublished && taskScoreId && reviewId;
    });
    userCheckSessionIds = userReviewRequestIds.map((id) => reviewRequests[id].checkSessionId);
  }

  function handleButtonClick(e: any) {
    message.info('You need to choose review.');
  }

  function handleMenuClick(e: any) {
    const checkSessionId = e.key;
    if (checkSessionId === 'item_0') return;
    const taskId = checkSessions[checkSessionId].taskId;
    const reviewRequestId = Object.keys(reviewRequests).find(
      (id) => reviewRequests[id].checkSessionId === checkSessionId
    );
    const taskScoreId = Object.keys(taskScores).find((id) => {
      return taskScores[id].reviewRequestId === reviewRequestId;
    });
    const reviewId = Object.keys(reviews).find((id) => reviews[id].taskScoreId === taskScoreId);
    const disputeId =
      disputes && Object.keys(disputes).length > 0
        ? Object.keys(disputes).find((id) => disputes[id].reviewId === reviewId)
        : undefined;
    const payload = {
      taskId,
      checkSessionId,
      taskScoreId,
      reviewId,
      disputeId,
    };

    if (reviewId && !disputeId) {
      const hide = message.loading('Loading in progress..', 0);
      const subTasks = reviews[reviewId].subTasks.map((subTask: any) => {
        subTask.comment = '';
        return subTask;
      });
      const newDispute = {
        reviewId,
        state: 'ONGOING',
        subTasks,
      };
      postToDB('disputes', newDispute).then((result) => {
        payload.disputeId = result.name;
        hide();
        props.onSelectClick(payload);
        setDisputeSelectActive(false);
      });
    } else {
      props.onSelectClick(payload);
      setDisputeSelectActive(false);
    }
  }

  const isUserCheckSessionIds = userCheckSessionIds.length > 0;
  const menuItems = isUserCheckSessionIds ? (
    userCheckSessionIds.map((id) => {
      const taskId = checkSessions[id].taskId;
      return (
        <Menu.Item key={id} icon={<UserOutlined />}>
          {tasks ? tasks[taskId].name : null}
        </Menu.Item>
      );
    })
  ) : (
    <Menu.Item>No available reviews</Menu.Item>
  );

  const menu = <Menu onClick={handleMenuClick}>{menuItems}</Menu>;

  const disputeSelector = (
    <div className={classes.wrapper}>
      <Row>
        <Col span={12}>
          <Dropdown.Button onClick={handleButtonClick} overlay={menu}>
            Start new dispute
          </Dropdown.Button>
        </Col>
      </Row>
    </div>
  );

  return (
    <div className={classes.layout}>
      <Header />
      {isDisputeSelectActive ? (
        disputeSelector
      ) : (
        <Dispute setDisputeSelectActive={setDisputeSelectActive} />
      )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  userObject: state.user,
  state,
});

const mapDispatchToProps = (dispatch: any) => {
  return {
    onSelectClick: (payload: any) =>
      dispatch({
        type: DISPUTE_SELECT,
        payload,
      }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DisputeSelector);
