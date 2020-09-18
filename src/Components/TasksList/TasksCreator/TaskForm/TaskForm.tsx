import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import createEssence from '../../../../Scripts/createEssenceTask';
import Hoc from '../../../Hoc/Hoc';

import classes from './TaskForm.module.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

interface TasksFormProps {
  editTaskMode: boolean;
  editTaskName: string;
  service: any;
}

const TaskForm: React.FC<TasksFormProps> = (props) => {
  const { service, editTaskMode, editTaskName } = props;
  const [form] = Form.useForm();
  const [importTaskMode, setImportTaskMode] = useState(false);
  const [task, setTask] = useState({
    name: '',
    author: '',
    state: '',
    subTasks: [],
    description: '',
  });
  const [valueMde, setValueMde] = useState({ value: () => {} });

  const getInstans = (instance: any) => {
    setValueMde(instance);
  };

  useEffect(() => {
    setImportTaskMode(false); // delete
    if (editTaskMode && editTaskName) {
      service.getTask(editTaskName).then((e: any) => setTask(e));
    }
  }, [editTaskMode, editTaskName, service]);

  const onFinish = (values: { [key: string]: any }) => {
    const description = valueMde.value();
    const taskEssence = createEssence(values, description);
    if (editTaskMode) {
      service.putTask(taskEssence, editTaskName);
    } else {
      service.postNewTask(taskEssence);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  if (editTaskMode || importTaskMode) {
    form.setFieldsValue({
      taskName: task.name,
      authorName: task.author,
      typeState: task.state,
      tasks: task.subTasks,
    });
  }

  return (
    <Form
      form={form}
      className={classes.taskForm}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 24 }}
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <TaskMainInfo />
      <TaskDescription getInstans={getInstans} description={task.description} />
      <TaskSubTasks />
      <TaskSubmitButton />
    </Form>
  );
};

export default Hoc()(TaskForm);
