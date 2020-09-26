import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Button, Form, Input, message, Select } from 'antd';
import uniqueBy from 'lodash/uniqBy';
import Hoc from '../Components/Hoc/Hoc';
import Service from '../Service/Service';
import {
  CrossCheckSession,
  CrossCheckSessionStates,
  Tasks,
  TaskStates,
  User,
  Users,
} from '../Reducer/reducer';
import Header from '../Components/Header/Header';
import './CheckSession.scss';

const DEFAULT_SESSION_DURATION_IN_DAYS = 14;
const { Item: FormItem } = Form;
const { Option } = Select;

export const CheckSession: React.FC = Hoc()(({ service }: { service: Service }) => {
  const { sessionId } = useParams() as { sessionId: string };
  const [checkSession, setCheckSession] = useState<CrossCheckSession>({
    name: '',
    taskId: '',
    coefficient: 0,
    startDate: new Date().toLocaleDateString(),
    endDate: new Date(
      new Date().setDate(new Date().getDate() + DEFAULT_SESSION_DURATION_IN_DAYS)
    ).toLocaleDateString(),
    state: CrossCheckSessionStates.CROSS_CHECK,
    crossCheck: {
      discardMaxScore: false,
      discardMinScore: false,
      minReviewsAmount: 1,
      desiredReviewersAmount: 2,
      attendees: [],
    },
  });
  const [tasks, setTasks] = useState<Tasks>({});
  const [users, setUsers] = useState<Users>({});

  useEffect(() => {
    if (sessionId) {
      service
        .getCheckSession(sessionId)
        .then((foundCheckSession) => setCheckSession(foundCheckSession as CrossCheckSession));
    }
    service.getAllTasks().then((allTasks) => setTasks(allTasks as Tasks));
    service.getAllUsers().then((allUsers) => setUsers(allUsers as Users));
  }, [sessionId, service]);
  const onNameChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCheckSession({
        ...checkSession,
        name: event.target.value,
      });
    },
    [setCheckSession, checkSession]
  );
  const onStateChange = useCallback(
    (value: CrossCheckSessionStates) => {
      setCheckSession({
        ...checkSession,
        state: value,
      });
    },
    [setCheckSession, checkSession]
  );
  const onTaskChange = useCallback(
    (value: string) => {
      setCheckSession({
        ...checkSession,
        taskId: value,
      });
    },
    [setCheckSession, checkSession]
  );
  const onReviewersAmountChange = (field: 'desiredReviewersAmount' | 'minReviewsAmount') => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCheckSession({
      ...checkSession,
      crossCheck: {
        ...checkSession.crossCheck,
        [field]: event.target.value,
      },
    });
  };
  const onAttendeesChange = useCallback(
    (attendees: string[]) => {
      setCheckSession({
        ...checkSession,
        crossCheck: {
          ...checkSession.crossCheck,
          attendees: attendees.map((attendee) => ({
            githubId: attendee,
            reviewerOf: attendees.filter((el) => el !== attendee),
          })),
        },
      });
    },
    [setCheckSession, checkSession]
  );

  const onSave = useCallback(() => {
    if (sessionId) {
      service.putCheckSession(sessionId, checkSession).then(() => {
        message.success('check session updated');
      });
    } else {
      service.postCheckSession(checkSession).then(() => {
        message.success('check session created');
      });
    }
  }, [checkSession, sessionId, service]);

  if (sessionId && !checkSession.name) {
    return null;
  }
  const userOptions = uniqueBy(
    Object.entries(users),
    ([_, user]: [string, User]) => user.githubId
  ).map(([key, user]: [string, User]) => (
    <Option key={key} value={String(user.githubId)}>
      {user.userName}
    </Option>
  ));
  const formInitialValues = {
    ...checkSession,
    users: (checkSession.crossCheck || { attendees: [] }).attendees.map((el) => el.githubId),
  };
  const tasksOptions = Object.entries(tasks)
    .filter(([_, task]) => task.state === TaskStates.PUBLISHED)
    .map(([key, task]) => (
      <Option key={key} value={key}>
        {task.name}
      </Option>
    ));

  return (
    <div id="check-session">
      <Header />
      <Form id="check-session-form" initialValues={formInitialValues}>
        <FormItem name="name" label="name">
          <Input onChange={onNameChange} />
        </FormItem>
        <FormItem name="state" label="state">
          <Select onChange={onStateChange}>
            <Option value={CrossCheckSessionStates.CROSS_CHECK}>Cross check</Option>
            <Option value={CrossCheckSessionStates.COMPLETED}>Completed</Option>
            <Option value={CrossCheckSessionStates.DRAFT}>Draft</Option>
            <Option value={CrossCheckSessionStates.REQUESTS_GATHERING}>Requests gathering</Option>
          </Select>
        </FormItem>
        <FormItem name="taskId" label="Task">
          <Select onChange={onTaskChange}>{tasksOptions}</Select>
        </FormItem>

        {checkSession.state === CrossCheckSessionStates.CROSS_CHECK && (
          <fieldset>
            <legend>Cross check</legend>
            <FormItem name={['crossCheck', 'minReviewsAmount']} label="min reviewers amount">
              <Input
                type="number"
                onChange={onReviewersAmountChange('minReviewsAmount' as const)}
              />
            </FormItem>
            <FormItem
              name={['crossCheck', 'desiredReviewersAmount']}
              label="desired reviewers amount"
            >
              <Input
                type="number"
                onChange={onReviewersAmountChange('desiredReviewersAmount' as const)}
              />
            </FormItem>
            <FormItem name="users" label="users">
              <Select mode="multiple" onChange={onAttendeesChange}>
                {userOptions}
              </Select>
            </FormItem>
          </fieldset>
        )}
        <Button onClick={onSave}>Save</Button>
      </Form>
    </div>
  );
});
