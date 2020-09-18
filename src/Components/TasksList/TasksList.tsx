import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import { DiffOutlined, CloudSyncOutlined } from '@ant-design/icons';
import tasksListColumns from './TasksCreator/tasksListColums/tasksListColumns';
import Hoc from '../Hoc/Hoc';
import Header from '../Header/Header';
import classes from './TasksList.module.scss';

interface allTasksType {
  service: any;
}

const TasksList: React.FC<allTasksType> = (props) => {
  const { service } = props;
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
            <Button type="primary" size="large" icon={<DiffOutlined />}>
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

export default Hoc()(TasksList);
