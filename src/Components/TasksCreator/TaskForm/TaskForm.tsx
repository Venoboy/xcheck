import React, { useState, useEffect } from 'react';
import { Form } from 'antd';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import createEssence from '../../../Scripts/createEssenceTask';
import Hoc from '../../Hoc/Hoc';

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
  setImportTaskMode(true); // delete need
  const [task, setTask] = useState({
    name: '',
    author: '',
    state: '',
    subTasks: [],
    description: '',
  });
  const [valueMde, setValueMde] = useState({ value: () => {} });
  console.log(task);

  const getInstans = (instance: any) => {
    setValueMde(instance);
  };

  useEffect(() => {
    if (editTaskMode && editTaskName) {
      service.getTask(editTaskName).then((e: any) => setTask(e));
    }
  }, [editTaskMode, service]);

  const onFinish = (values: { [key: string]: any }) => {
    console.log('Success:');
    const description = valueMde.value();
    const taskEssence = createEssence(values, description);
    console.log(taskEssence);
    if (!editTaskMode) {
      service.postNewTask(taskEssence).then((e: any) => console.log(e));
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
