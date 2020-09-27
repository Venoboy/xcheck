import React, { useCallback, useEffect, useState } from 'react';
import { Table } from 'antd';
import Header from '../../Components/Header/Header';
import './ReviewRequests.scss';

const sortDate = (a: any, b: any, type: string) => {
  let aMili: any = 0;
  let bMili: any = 0;

  if (type === 'start') {
    aMili = new Date(a.datestart.split('/').join(','));
    bMili = new Date(b.datestart.split('/').join(','));
  } else if (type === 'end') {
    aMili = new Date(a.enddate.split('/').join(','));
    bMili = new Date(b.enddate.split('/').join(','));
  } else if (type === 'delivered') {
    aMili = new Date(a.delivered.split('/').join(','));
    bMili = new Date(b.delivered.split('/').join(','));
  }

  return aMili.getTime() - bMili.getTime();
};

const ReviewRequests: React.FC = () => {
  const [userId, setUserId] = useState<null | string>(null);
  const [data, setData] = useState<any>();

  const getInfo = useCallback(async () => {
    const url = 'https://x-check-9d19c.firebaseio.com/';
    const fetchReviewRequests = (await (await fetch(`${url}reviewRequests.json`)).json()) || {};
    const fetchTasks = (await (await fetch(`${url}tasks.json`)).json()) || {};
    const fetchCheckSessions = (await (await fetch(`${url}checkSessions.json`)).json()) || {};

    const tempRequests: any[] = [];
    Object.keys(fetchReviewRequests).forEach((key) => {
      if (fetchReviewRequests[key].author === userId) {
        tempRequests.push(fetchReviewRequests[key]);
      }
    });

    const tempData: any[] = [];
    tempRequests.forEach((req) => {
      tempData.push({
        datestart: fetchCheckSessions[req.checkSessionId]?.startDate,
        enddate: fetchCheckSessions[req.checkSessionId]?.endDate,
        solution: req.solution,
        delivered: req.date,
        state: fetchCheckSessions[req.checkSessionId]?.state,
        name: fetchTasks[fetchCheckSessions[req.checkSessionId]?.taskId]?.name,
        key: req.checkSessionId,
      });
    });

    setData(tempData);
  }, [userId]);

  useEffect(() => {
    setUserId(localStorage.getItem('githubId') as string);
  }, []);

  useEffect(() => {
    if (userId) {
      getInfo();
    }
  }, [userId, getInfo]);

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Date start',
      dataIndex: 'datestart',
      sorter: (a: any, b: any) => sortDate(a, b, 'start'),
    },
    {
      title: 'End date',
      dataIndex: 'enddate',
      sorter: (a: any, b: any) => sortDate(a, b, 'end'),
    },
    {
      title: 'When delivered',
      dataIndex: 'delivered',
      sorter: (a: any, b: any) => sortDate(a, b, 'delivered'),
    },
    {
      title: 'Solution',
      dataIndex: 'solution',
    },
    {
      title: 'State',
      dataIndex: 'state',
      filters: [
        { text: 'REQUESTS_GATHERING', value: 'REQUESTS_GATHERING' },
        { text: 'CROSS_CHECK', value: 'CROSS_CHECK' },
        { text: 'COMPLETED', value: 'COMPLETED' },
      ],
      onFilter: (value: any, record: any) => record.state.includes(value),
    },
  ];

  return (
    <div className="review-requests">
      <Header />
      <Table columns={columns} dataSource={data} size="large" loading={!data} />
    </div>
  );
};

export default ReviewRequests;
