import React, { useState, useEffect } from 'react';
import { Alert, Button, Menu, Dropdown, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import Header from '../Header/Header';
import { changeSelectedTaskId } from '../../Actions/Actions';
import './SelectingTask.scss';

const SelectingTask: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [githubId, setGithubId] = useState<string>('');
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<string>('');
  const [reviewRequests, setReviewRequests] = useState<any>({});
  const [tasks, setTasks] = useState<any>();
  const [infoTask, setInfoTask] = useState<any>();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const solutionInputRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const getTasks = async () => {
    const url = 'https://x-check-9d19c.firebaseio.com/';
    const checkSessions = (await (await fetch(`${url}checkSessions.json`)).json()) || {};
    const fetchTasks = (await (await fetch(`${url}tasks.json`)).json()) || {};
    const fetchReviewRequests = (await (await fetch(`${url}reviewRequests.json`)).json()) || {};

    setReviewRequests(fetchReviewRequests);

    const tempTasks: any[] = [];

    Object.keys(checkSessions).forEach((key) => {
      const session = checkSessions[key];
      if (session.state !== 'DRAFT') {
        if (fetchTasks[session.taskId]?.name) {
          tempTasks.push({
            ...session,
            name: fetchTasks[session.taskId]?.name,
            id: key,
          });
        }
      }
    });

    setTasks(tempTasks);
  };

  const dropdownClick = (item: any) => {
    tasks.forEach((task: any) => {
      if (task.id === item.id) {
        setInfoTask(task);
        setSelectedTask(task.name);
        dispatch(changeSelectedTaskId({ selectedTaskId: item.taskId, checkSessionId: item.id }));
      }
    });

    setIsSelected(true);
  };

  const submitSolution = async () => {
    const solutionUrl = solutionInputRef.current.value;
    const url = 'https://x-check-9d19c.firebaseio.com/reviewRequests.json';
    const field = `${infoTask.id}-${githubId}`;

    if (solutionUrl && githubId) {
      setIsSubmit(true);

      const reviewRequest = {
        taskId: infoTask.taskId,
        checkSessionId: infoTask.id,
        author: githubId,
        state:
          reviewRequests[`${infoTask.id}-${githubId}`]?.state === 'PUBLISHED'
            ? 'PUBLISHED'
            : 'DRAFT',
        solution: solutionUrl,
        date: new Date().toLocaleDateString(),
      };

      const options = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...reviewRequests,
          [field]: reviewRequest,
        }),
      };

      await fetch(url, options).then(async () => {
        solutionInputRef.current.value = '';
        const fetchReviewRequests = await (await fetch(url)).json();
        setReviewRequests(fetchReviewRequests);
        setIsSubmit(false);
      });
    }
  };

  const menu = () => (
    <Menu>
      {tasks.map((task: any) => (
        <Menu.Item key={task.id} onClick={() => dropdownClick(task)}>
          {task.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  useEffect(() => {
    setGithubId(localStorage.getItem('githubId') as string);
    getTasks();
  }, []);

  const openSelfCheck = () =>
    history.push(`/self-check/${infoTask.taskId}/${infoTask.id}-${githubId}`);

  return (
    <div className="selecting-task">
      <Header />
      <div className="selecting-task__info">
        <h3 className="selecting-task__task-name">
          <span className="star">*</span>
          Task
        </h3>
        {tasks ? (
          <div className="dropdown">
            <Dropdown overlay={menu} trigger={['click']} overlayClassName="overlay-selecting-task">
              <span className="ant-dropdown-link">
                {selectedTask}
                <DownOutlined />
              </span>
            </Dropdown>
          </div>
        ) : (
          <Spin size="large" />
        )}

        {isSelected && (
          <div className="solution-url">
            <Alert
              message={
                reviewRequests[`${infoTask.id}-${githubId}`]?.solution ? (
                  <div className="solution-message">
                    Submitted:
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={reviewRequests[`${infoTask.id}-${githubId}`].solution}
                    >
                      {reviewRequests[`${infoTask.id}-${githubId}`].solution}
                    </a>
                    on
                    <span className="solution-date">
                      {reviewRequests[`${infoTask.id}-${githubId}`].date}
                    </span>
                  </div>
                ) : (
                  'The link to the solution was not sent'
                )
              }
              type={reviewRequests[`${infoTask.id}-${githubId}`]?.solution ? 'success' : 'warning'}
              showIcon
            />
          </div>
        )}
      </div>

      {isSelected && infoTask.state === 'REQUESTS_GATHERING' && (
        <div className="selecting-task__solution">
          <h3 className="selecting-task__link">
            <span className="star">*</span>
            Solution URL
          </h3>
          <input type="text" className="selecting-task__enter" ref={solutionInputRef} />
          <Button
            className="submit"
            type="primary"
            size="middle"
            onClick={submitSolution}
            loading={isSubmit}
          >
            Submit
          </Button>

          {reviewRequests[`${infoTask.id}-${githubId}`] && (
            <Button className="self" type="primary" size="middle" onClick={openSelfCheck}>
              {reviewRequests[`${infoTask.id}-${githubId}`]?.state === 'DRAFT'
                ? 'Add self-check'
                : 'Change self-check'}
            </Button>
          )}
        </div>
      )}

      {isSelected && infoTask.state !== 'REQUESTS_GATHERING' && (
        <Alert
          type="warning"
          message="The deadline has passed already"
          showIcon
          className="deadline"
        />
      )}
    </div>
  );
};

export default SelectingTask;
