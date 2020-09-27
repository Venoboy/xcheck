import React, { useEffect, useState } from 'react';
import { Table, Button } from 'antd';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Header from '../../Components/Header/Header';
import { changeReview } from '../../Actions/Actions';
import './Score.scss';

const Score: React.FC = () => {
  const [userId, setUserId] = useState<null | string>(null);
  const [data, setData] = useState<any>();
  const history = useHistory();
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      sorter: (a: any, b: any) => a.score - b.score,
    },
    {
      title: 'Task author',
      dataIndex: 'taskauthor',
    },
    {
      title: 'Review author',
      dataIndex: 'reviewauthor',
    },
    {
      title: 'State',
      dataIndex: 'state',
      filters: [
        { text: 'PUBLISHED', value: 'PUBLISHED' },
        { text: 'DRAFT', value: 'DRAFT' },
        { text: 'DISPUTED', value: 'DISPUTED' },
        { text: 'ACCEPTED', value: 'ACCEPTED' },
        { text: 'REJECTED', value: 'REJECTED' },
      ],
      onFilter: (value: any, record: any) => record.state.includes(value),
    },
    {
      title: 'Details',
      dataIndex: 'details',
    },
  ];

  const toDetails = async (id: string) => {
    const url = 'https://x-check-9d19c.firebaseio.com/';
    const fetchReviews = (await (await fetch(`${url}reviews.json`)).json()) || {};
    dispatch(changeReview(fetchReviews[id]));
    history.push('/task-review');
  };

  const getInfo = async () => {
    const url = 'https://x-check-9d19c.firebaseio.com/';
    const fetchReviewRequests = (await (await fetch(`${url}reviewRequests.json`)).json()) || {};
    const fetchReviews = (await (await fetch(`${url}reviews.json`)).json()) || {};
    const fetchTaskScores = (await (await fetch(`${url}taskScores.json`)).json()) || {};
    const fetchTasks = (await (await fetch(`${url}tasks.json`)).json()) || {};

    const myReviewRequests: any[] = [];
    Object.keys(fetchReviewRequests).forEach((key) => {
      if (fetchReviewRequests[key].author === userId) {
        myReviewRequests.push(key);
      }
    });

    const myScores: any[] = [];
    Object.keys(fetchTaskScores).forEach((key) => {
      const taskScore = fetchTaskScores[key];
      if (myReviewRequests.includes(taskScore.reviewRequestId)) {
        myScores.push(key);
      }
    });

    const myReviews: any[] = [];
    Object.keys(fetchReviews).forEach((key) => {
      const review = fetchReviews[key];
      let tempScore = 0;

      if (myScores.includes(review.taskScoreId)) {
        review.subTasks.forEach((subTask: any) => {
          tempScore += subTask.score;
        });
        myReviews.push({
          ...review,
          score: tempScore,
          id: key,
        });
      }
    });

    const tempData: any[] = [];
    myReviews.forEach((item: any) => {
      tempData.push({
        key: item.id,
        name: fetchTasks[fetchReviewRequests[fetchTaskScores[item.taskScoreId].reviewRequestId].taskId].name,
        state: item.state,
        score: item.score,
        taskauthor: fetchTasks[fetchReviewRequests[fetchTaskScores[item.taskScoreId].reviewRequestId].taskId].author,
        reviewauthor: item.author,
        details: <Button onClick={() => toDetails(item.id)}>Details</Button>,
      });
    });

    setData(tempData);
  };

  useEffect(() => {
    setUserId(localStorage.getItem('githubId') as string);
  }, []);

  useEffect(() => {
    if (userId) {
      getInfo();
    }
  }, [userId]);

  return (
    <div className="score">
      <Header />
      <Table columns={columns} dataSource={data} size="large" loading={!!!data} />
    </div>
  );
};

export default Score;
