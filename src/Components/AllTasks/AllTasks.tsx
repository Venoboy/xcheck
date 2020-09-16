import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import Hoc from '../Hoc/Hoc';
import Header from '../Header/Header';
import TasksCreator from '../TasksCreator/TasksCreator';

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

  console.log(allTasks);

  const ListTasks = () => {
    return (
      <List
        itemLayout="horizontal"
        size="small"
        pagination={{ pageSize: 10 }}
        dataSource={allTasks}
        renderItem={(item: any) => (
          <List.Item key={item.taskId}>
            <List.Item.Meta title={item.name} description={item.author} />
            <p>Edit</p>
          </List.Item>
        )}
      />
    );
  };

  return (
    <div className={classes.allTasks}>
      <Header />
      <ListTasks />
      <TasksCreator />
    </div>
  );
};

export default Hoc()(AllTasks);
