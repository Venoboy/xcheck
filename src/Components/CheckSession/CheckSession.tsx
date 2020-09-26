import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal, Form, Radio, InputNumber, DatePicker, Select } from 'antd';
import Header from '../Header/Header';
import Hoc from '../Hoc/Hoc';
import getFromDB from '../../Service/getFromBD';
import classes from './CheckSession.module.scss';
import postToBD from '../../Service/postToBD';

const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm();

  return (
    <Modal
      visible={visible}
      title="Create a new cross-check session"
      okText="Add session"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            return info;
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="coefficient"
          label="Coefficient"
          rules={[
            {
              required: true,
              message: 'Please input coefficient number between 0.01 and 1',
            },
          ]}
        >
          <InputNumber min={0.01} max={1} step={0.1} value={0.5} />
        </Form.Item>

        <Form.Item
          name="startDate"
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'Please select start Date',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="endDate"
          label="End Date"
          rules={[
            {
              required: true,
              message: 'Please select end Date',
            },
          ]}
        >
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>

        <Form.Item
          name="state"
          label="Session status"
          className="collection-create-form_last-form-item"
          rules={[
            {
              required: true,
              message: 'Please select status for your session',
            },
          ]}
        >
          <Radio.Group>
            <Radio.Button value="DRAFT">Draft</Radio.Button>
            <Radio.Button value="REQUESTS_GATHERING">Requests gathering</Radio.Button>
          </Radio.Group>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const CrossCheck: React.FC = (props: any) => {
  const { Option } = Select;
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [tasksList = [], setTasks] = useState([] as any);
  const [isCreateButtonDisabled, toggleStatusButton] = useState(true as boolean);
  const [sessionName, changeSessionName] = useState('' as string);
  const [taskId, setTaskId] = useState('' as string);

  const getNewDateFormat = (date: string) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = `0${newDate.getMonth() + 1}`;
    const day = `0${newDate.getDate()}`;
    return `${year}/${month.substr(-2)}/${day.substr(-2)}`;
  };

  const onCreate = async (values: any) => {
    // eslint-disable-next-line no-underscore-dangle
    const startDateString = values.startDate._d;
    // eslint-disable-next-line no-underscore-dangle
    const endDateString = values.endDate._d;

    const startDate = getNewDateFormat(startDateString);
    const endDate = getNewDateFormat(endDateString);

    const { coefficient, state } = values;

    const sessionData = {
      startDate,
      endDate,
      coefficient,
      state,
      name: sessionName,
      taskId,
      crossCheck: false,
    };

    setVisible(false);

    postToBD('checkSessions', sessionData);
  };

  function onChangeSelectTask(value: string) {
    if (isCreateButtonDisabled) {
      toggleStatusButton(false);
    }
    changeSessionName(value);

    const taskIdValue = tasksList.find((item: any) => item[1].name === value)[0];
    setTaskId(taskIdValue);
  }

  useEffect(() => {
    if (tasksList.length === 0) {
      const getTasksList = async () => {
        const tasksData = await getFromDB('tasks');
        const tasksListArray = Object.entries(tasksData).filter(
          (item: any) => item[1].state === 'PUBLISHED'
        );

        return setTasks(tasksListArray);
      };
      getTasksList();
    }
  });

  const renderTasksList = () => {
    if (tasksList.length !== 0) {
      return tasksList.map((item: any, index: number) => {
        const num = index;
        return (
          <Option key={num} value={item[1].name}>
            {item[1].name}
          </Option>
        );
      });
    }
    return null;
  };

  return (
    <div className={classes.CrossCheck}>
      <Header className={classes.CrossCheck__Header} />
      <div className={classes.CrossCheck__SelectTask}>
        <Select
          showSearch
          style={{ width: 300 }}
          placeholder="Select active task"
          optionFilterProp="children"
          onChange={onChangeSelectTask}
        >
          {renderTasksList()}
        </Select>
      </div>
      <div className={classes.CrossCheck__Buttons}>
        <div>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
            disabled={isCreateButtonDisabled}
          >
            Create new session
          </Button>
          <CollectionCreateForm
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </div>
        <Button
          type="primary"
          onClick={() => {
            history.push('/checksession/list');
          }}
        >
          Sessions list
        </Button>
        <Button type="primary" onClick={() => history.push('/')}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default Hoc()(CrossCheck);
