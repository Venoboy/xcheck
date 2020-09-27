import React, { useState, useEffect } from 'react';
import { Button, Card, DatePicker, Form, InputNumber, Modal, Radio, Switch } from 'antd';
import { useHistory } from 'react-router-dom';
import Header from '../../Header/Header';
import Hoc from '../../Hoc/Hoc';
import getFromBD from '../../../Service/getFromBD';
import classes from '../CheckSession.module.scss';
import patchBD from '../../../Service/patchBD';
import getNewDateFormat from '../helperFunc';

const CollectionCreateForm = ({ visible, onCreate, onCancel }: any) => {
  const [form] = Form.useForm();

  const [statusValue, changeDisabledStatus] = useState(true as boolean);
  const [rulesList, setRules] = useState([] as any);

  const onValuesChange = (changedValues: any, allValues: any) => {
    if (changedValues.state) {
      if (changedValues.state === 'CROSS_CHECK') {
        changeDisabledStatus(false);
        setRules([
          {
            required: true,
            message: 'Please input correct number',
          },
        ]);
      } else {
        changeDisabledStatus(true);
        setRules([]);
      }
    }
  };

  return (
    <Modal
      visible={visible}
      title="Edit properties of cross-check session"
      okText="Edit session"
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
        onValuesChange={onValuesChange}
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
            <Radio.Button value="CROSS_CHECK">Cross Check</Radio.Button>
            <Radio.Button value="COMPLITED">Completed</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="discardMaxScore" label="Discard maximum score">
          <Switch disabled={statusValue} />
        </Form.Item>

        <Form.Item name="discardMinScore" label="Discard minimum score">
          <Switch defaultChecked disabled={statusValue} />
        </Form.Item>

        <Form.Item name="minReviewersAmount" label="Minimum reviewers amount" rules={rulesList}>
          <InputNumber min={1} max={4} step={1} value={1} disabled={statusValue} />
        </Form.Item>

        <Form.Item name="desiredReviewersAmount" label="Desired reviewers amount" rules={rulesList}>
          <InputNumber min={1} max={4} step={1} value={1} disabled={statusValue} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

const SessionsList = () => {
  const history = useHistory();
  const [visible, setVisible] = useState(false);

  const [allSessions, setAllSessions] = useState([] as any);
  const [currentSession, setCurrentSessionKey] = useState('' as string);

  const onCreate = async (values: any) => {
    setVisible(false);
    // eslint-disable-next-line no-underscore-dangle
    const startDateString = values.startDate._d;
    // eslint-disable-next-line no-underscore-dangle
    const endDateString = values.endDate._d;

    const startDate = getNewDateFormat(startDateString);
    const endDate = getNewDateFormat(endDateString);

    const { coefficient, state, minReviewersAmount, desiredReviewersAmount } = values;

    let { discardMaxScore, discardMinScore, crossCheck } = values;

    if (state === 'CROSS_CHECK') {
      if (discardMaxScore === undefined) {
        discardMaxScore = false;
      }
      if (discardMinScore === undefined) {
        discardMinScore = true;
      }

      type userData = {
        githubId: string;
        reviewerOf: string[];
      };

      const studentsData = await getFromBD('reviewRequests');
      const studentsValues = Object.values(studentsData).filter(
        (el: any) => el.checkSessionId === currentSession && el.state === 'PUBLISHED'
      );
      const attendees = studentsValues.map((item: any, index: number) => {
        const user: userData = {
          githubId: '',
          reviewerOf: [],
        };
        user.githubId = item.author;

        const arr = [...studentsValues];
        arr.splice(index, 1);
        const reviewrs = arr
          .sort(() => Math.random() - 0.5)
          .slice(0, desiredReviewersAmount)
          .map((el: any) => el.author);

        user.reviewerOf = reviewrs;

        return user;
      });

      crossCheck = {
        desiredReviewersAmount,
        discardMaxScore,
        discardMinScore,
        minReviewersAmount,
        attendees,
      };
    } else {
      crossCheck = false;
    }

    const sessionData = {
      startDate,
      endDate,
      coefficient,
      state,
      crossCheck,
    };

    patchBD(`checkSessions/${currentSession}`, sessionData);
  };

  const getSessionList = async () => {
    const sessionsData = await getFromBD('checkSessions');
    const sessions = Object.entries(sessionsData);

    return setAllSessions(sessions);
  };

  useEffect(() => {
    if (allSessions.length === 0) {
      getSessionList();
    }
  });

  function renderCards() {
    if (allSessions.length !== 0) {
      return allSessions.map((item: any, index: number) => {
        const num = index;
        return (
          <Card key={num} title={item[1].name} style={{ width: 300 }}>
            <p>
              Coefficient: &nbsp;
              {item[1].coefficient}
            </p>
            <p>
              CrossCheck: &nbsp;
              {item[1].crossCheck ? 'true' : 'false'}
            </p>
            <p>
              Start Date: &nbsp;
              {item[1].startDate}
            </p>
            <p>
              End Date: &nbsp;
              {item[1].endDate}
            </p>
            <p>
              State: &nbsp;
              {item[1].state}
            </p>
            <p>
              Task ID: &nbsp;
              {item[1].taskId}
            </p>

            <Button
              type="primary"
              onClick={() => {
                setVisible(true);
                setCurrentSessionKey(item[0]);
              }}
            >
              Edit
            </Button>
          </Card>
        );
      });
    }
    return null;
  }

  return (
    <div className={classes.CrossCheck}>
      <Header className={classes.CrossCheck__Header} />
      <div className={classes.CrossCheck__List}>{renderCards()}</div>

      <div className={classes.CrossCheck__Buttons}>
        <Button type="primary" onClick={() => getSessionList()}>
          Refresh session list
        </Button>
        <Button type="primary" onClick={() => history.push('/checksession')}>
          Back
        </Button>
      </div>

      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default Hoc()(SessionsList);
