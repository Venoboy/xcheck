import React, { useState, useEffect } from 'react';
import { Table, Button, Tag, Modal } from 'antd';
import { Link } from 'react-router-dom';
import {
  DiffOutlined,
  CloudSyncOutlined,
  ExclamationCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import Hoc from '../Hoc/Hoc';
import Header from '../Header/Header';
import classes from './TasksList.module.scss';

const { confirm } = Modal;

interface allTasksType {
  service: any;
  userName: string | null;
  userRole: [string];
}

const TasksList: React.FC<allTasksType> = (props) => {
  const { service, userName, userRole } = props;
  const [allTasks, setAllTask] = useState();

  const onUpdateTaskList = () => {
    service.getAllTasks().then((e: any) => {
      if (e) {
        const keys = Object.keys(e);
        const arrTasks: any = keys.map((key) => {
          e[key].taskId = key;
          e[key].key = key;
          return e[key];
        });
        setAllTask(arrTasks);
      }
    });
  };

  useEffect(() => {
    onUpdateTaskList();
  }, []);

  const onDeleteTask: any = (taskName: any) => {
    confirm({
      title: 'Are you sure delete this task?',
      icon: <ExclamationCircleOutlined />,
      content: 'A deleted task cannot be restored',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        service.delTask(taskName).then(setTimeout(() => onUpdateTaskList(), 1500));
      },
    });
  };

  const tasksListColumns = [
    {
      title: 'Name Task',
      dataIndex: 'name',
      key: 'name',
      render: (text: any) => text,
      sorter: (a: any, b: any) => {
        const wordA = a.name.toLowerCase();
        const wordB = b.name.toLowerCase();
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
          <Button
            disabled={
              !(
                (record.author === userName && userRole.includes('Author')) ||
                userRole.includes('Supervisor') ||
                userRole.includes('Course manager')
              )
            }
            size="small"
            type="primary"
            key={text}
            icon={<FormOutlined />}
          >
            Edit
          </Button>
        </Link>
      ),
    },
    {
      title: 'Delete',
      key: 'delete',
      render: (text: any, record: any) => (
        <Button
          disabled={
            !(
              (record.author === userName && userRole.includes('Author')) ||
              userRole.includes('Supervisor') ||
              userRole.includes('Course manager')
            )
          }
          onClick={() => onDeleteTask(record.taskId)}
          size="small"
          key={text}
          type="primary"
          danger
          icon={<DeleteOutlined />}
        >
          Delete
        </Button>
      ),
    },
  ];

  const TasksTable = () => {
    return (
      <Table
        pagination={{ position: ['bottomCenter'] }}
        bordered
        size="small"
        columns={tasksListColumns}
        dataSource={allTasks}
        footer={() => (
          <Link to="/task-create">
            <Button
              disabled={
                !(
                  userRole.includes('Author') ||
                  userRole.includes('Supervisor') ||
                  userRole.includes('Course manager')
                )
              }
              type="primary"
              size="large"
              icon={<DiffOutlined />}
            >
              Create Task
            </Button>
          </Link>
        )}
        title={() => (
          <>
            <h1 style={{ alignItems: 'center', display: 'flex' }}>
              Tasks List
              <Button
                size="large"
                style={{ marginLeft: '25px' }}
                type="default"
                icon={<CloudSyncOutlined />}
                onClick={onUpdateTaskList}
              >
                Update List
              </Button>
            </h1>
          </>
        )}
      />
    );
  };

  return (
    <div className={classes.allTasks}>
      <Header />
      <TasksTable />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    userName: state.user.userName,
    userRole: state.user.role,
  };
};

export default connect(mapStateToProps)(Hoc()(TasksList));
