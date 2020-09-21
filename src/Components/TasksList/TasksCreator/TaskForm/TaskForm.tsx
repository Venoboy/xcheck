import React, { useState, useEffect } from 'react';
import { Form, Modal, Input, message } from 'antd';
import { useHistory } from 'react-router';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import refactorImportSubTasks from '../../../../Scripts/refactorImportSubTasks';
import TaskMainInfo from '../TaskMainInfo/TaskMainInfo';
import TaskDescription from '../TaskDescription/TaskDescription';
import TaskSubTasks from '../TaskSubTasks/TaskSubTasks';
import TaskSubmitButton from '../TaskSubmitButton/TaskSubmitButton';
import createEssence from '../../../../Scripts/createEssenceTask';
import Hoc from '../../../Hoc/Hoc';

import classes from './TaskForm.module.scss';
import 'antd/dist/antd.css';
import './easymde.min.css';

const { confirm } = Modal;

interface TasksFormProps {
  editTaskMode: boolean;
  editTaskName: string;
  service: any;
}

const TaskForm: React.FC<TasksFormProps> = (props) => {
  const history = useHistory();
  const { service, editTaskMode, editTaskName } = props;
  const [form] = Form.useForm();
  const [showModalJson, setShowModalJson] = useState(false);
  const [showModalMarkdown, setShowModalMarkdown] = useState(false);
  const [showModalRss, setShowModalRss] = useState(false);
  const [editMode, setEditMode] = useState(editTaskMode);
  const [editName, setEditName] = useState(editTaskName);
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
    if (editMode && editName) {
      service.getTask(editName).then((e: any) => {
        setTask(e);
        form.setFieldsValue({
          taskName: e.name,
          authorName: e.author,
          typeState: e.state,
          tasks: e.subTasks,
        });
      });
    }
  }, [editMode, editName, service]);

  const onFinish = (values: { [key: string]: any }) => {
    confirm({
      title: 'Back to the list of tasks?',
      icon: <ExclamationCircleOutlined />,
      content: 'Do you want to go back to the full list of all assignments, or continue editing?',
      okText: 'Back to Tasks List',
      cancelText: 'Continue Editing',
      onOk() {
        // @ts-ignore
        const description = valueMde.value();
        const taskEssence = createEssence(values, description);
        if (editMode) {
          service.putTask(taskEssence, editName);
        } else {
          service.postNewTask(taskEssence).then((e: any) => {
            setEditMode(true);
            setEditName(e.name);
          });
        }
        setTimeout(() => history.push('/tasks-list'), 500);
      },
      onCancel() {
        const description = valueMde.value();
        const taskEssence = createEssence(values, description);
        if (editMode) {
          service.putTask(taskEssence, editName);
        } else {
          service.postNewTask(taskEssence).then((e: any) => {
            setEditMode(true);
            setEditName(e.name);
          });
        }
      },
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    return errorInfo;
  };

  const exportJson = () => {
    if (editMode) {
      const description = valueMde.value();
      const formValues = form.getFieldsValue();
      const taskEssence = createEssence(formValues, description);
      try {
        navigator.clipboard.writeText(JSON.stringify(taskEssence));
        message.success('Export in clipboard success');
      } catch (e) {
        message.error(e);
      }
    } else {
      const modal = Modal.error({
        title: 'Please save this task first',
      });
      setTimeout(() => {
        modal.destroy();
      }, 3000);
    }
  };

  const importJson = () => {
    setShowModalJson(true);
  };

  const importMarkdown = () => {
    setShowModalMarkdown(true);
  };

  const importRss = () => {
    setShowModalRss(true);
  };

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
      <TaskMainInfo
        importMarkdown={importMarkdown}
        exportJson={exportJson}
        importJson={importJson}
        importRss={importRss}
      />
      <TaskDescription getInstans={getInstans} description={task.description} />
      <TaskSubTasks />
      <TaskSubmitButton editMode={editMode} />
      <Modal
        title="Insert your task in Json format"
        visible={showModalJson}
        onOk={() => {
          const importTask = JSON.parse(
            (document.getElementById('importJson') as HTMLInputElement).value
          );
          setTask(importTask);
          form.setFieldsValue({
            taskName: importTask.name,
            authorName: importTask.author,
            typeState: importTask.state,
            tasks: importTask.subTasks,
          });
          setShowModalJson(false);
        }}
        onCancel={() => setShowModalJson(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <Input.TextArea rows={4} id="importJson" />
      </Modal>
      <Modal
        title="Insert your task in Markdown format"
        visible={showModalMarkdown}
        onOk={() => {
          const importTask = (document.getElementById('importMarkdown') as HTMLInputElement).value;
          setTask({
            ...task,
            description: importTask,
          });
          setShowModalMarkdown(false);
        }}
        onCancel={() => setShowModalMarkdown(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <Input.TextArea rows={4} id="importMarkdown" />
      </Modal>
      <Modal
        title="Insert your task in RSS CheckList format"
        visible={showModalRss}
        onOk={() => {
          const importTask = JSON.parse(
            (document.getElementById('importRss') as HTMLInputElement).value
          );
          const importSubTasks = refactorImportSubTasks(importTask);
          setTask({
            ...task,
            description: importTask.information ? importTask.information : task.description,
            name: importTask.taskName,
            subTasks: importSubTasks,
          });
          form.setFieldsValue({
            taskName: importTask.taskName,
            tasks: importSubTasks,
          });
          setShowModalRss(false);
        }}
        onCancel={() => setShowModalRss(false)}
        okText="OK"
        cancelText="Cancel"
      >
        <Input.TextArea rows={4} id="importRss" />
      </Modal>
    </Form>
  );
};

export default Hoc()(TaskForm);
