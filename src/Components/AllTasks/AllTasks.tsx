import React, { useState, useEffect } from 'react';
import { Table, Tag, Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormOutlined, DeleteOutlined, DiffOutlined } from '@ant-design/icons';
import Hoc from '../Hoc/Hoc';
import Header from '../Header/Header';
import classes from './AllTasks.module.scss';

interface allTasksType {
  service: any;
}

const AllTasks: React.FC<allTasksType> = (props) => {
  const { service } = props;
  const [allTasks, setAllTask] = useState();

  useEffect(() => {
    service.getAllTasks().then((e: any) => {
      const keys = Object.keys(e);
      const arrTasks: any = keys.map((key) => {
        e[key].taskId = key;
        return e[key];
      });
      setAllTask(arrTasks);
    });
  }, []);

  const ListTasks = () => {
    const columns = [
      {
        title: 'Name Task',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => text,
      },
      {
        title: 'Author',
        dataIndex: 'author',
        key: 'author',
        sorter: (a: any, b: any) => {
          const wordA = a.author.toLowerCase();
          const wordB = b.author.toLowerCase();
          if (wordA < wordB) {
            return -1;
          }
          if (wordA > wordB) {
            return 1;
          }
          return 0;
        },
      },
      {
        title: 'Score',
        dataIndex: 'subTasks',
        key: 'subTasks',
        render: (subTasks: string | any[]) => {
          let score = 0;
          if (typeof subTasks !== 'string') {
            for (let i: any = 0; i < subTasks.length; i++) {
              if (subTasks[i].score > 0) {
                score += subTasks[i].score;
              }
            }
          }
          return <p key={subTasks.length}>{score}</p>;
        },
      },
      {
        title: 'State',
        key: 'state',
        dataIndex: 'state',
        render: (tags: any) => {
          let color = tags.length > 5 ? 'green' : 'geekblue';
          if (tags === 'ARCHIVED') {
            color = 'volcano';
          }
          return (
            <Tag key={tags} color={color}>
              {tags.toUpperCase()}
            </Tag>
          );
        },
        sorter: (a: any, b: any) => a.state.length - b.state.length,
      },
      {
        title: 'Edit',
        key: 'edit',
        render: (text: any, record: any) => (
          <Link to={`/task-create/${record.taskId}`}>
            <Button size="small" type="primary" key={text} icon={<FormOutlined />}>
              Edit
            </Button>
          </Link>
        ),
      },
      {
        title: 'Delete',
        key: 'delete',
        render: (text: any) => (
          <Button size="small" key={text} type="primary" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        ),
      },
    ];
    return (
      <Table
        columns={columns}
        dataSource={allTasks}
        footer={() => (
          <Link to="/task-create">
            <Button type="primary" size="large" icon={<DiffOutlined />}>
              Create Task
            </Button>
          </Link>
        )}
      />
    );
  };

  return (
    <div className={classes.allTasks}>
      <Header />
      <ListTasks />
    </div>
  );
};

export default Hoc()(AllTasks);
