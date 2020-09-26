/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Typography, Button } from 'antd';
import { Subtask } from './ components/subtask/subtask';
import { putToBD, getFromBD, postToBD } from './helpers';
import './Selfcheck.scss';

const { Title } = Typography;

class Selfcheck extends React.Component {
  constructor(props) {
    super(props);
    const { reviewRequestId } = this.props;
    this.state = {
      task: null,
      taskScore: {
        subTasks: [],
        reviewRequestId,
      },
      isTaskScoreExist: false,
      reviewRequest: {},
      taskId: 1,
    };
  }

  componentDidMount() {
    const { taskScore } = this.state;
    const reviewRequestFromBD = getFromBD(`reviewRequests/${taskScore.reviewRequestId}`);
    reviewRequestFromBD.then((resRequest) => {
      this.setState(
        {
          isTaskScoreExist: resRequest?.state === 'DRAFT',
          taskId: resRequest?.taskId,
          reviewRequest: resRequest,
        },
        () => {
          const { taskId } = this.state;
          const task = getFromBD(`tasks/${taskId}`);
          task.then((resTask) => {
            this.setState(
              {
                task: resTask,
              },
              () => this.getTaskScore()
            );
          });
        }
      );
    });
  }

  handleSubmit = () => {
    const { taskScore, reviewRequest, isTaskScoreExist } = this.state;
    postToBD('taskScores/', taskScore);
    if (!isTaskScoreExist) {
      this.setState(
        (prevState) => ({
          reviewRequest: {
            ...prevState.reviewRequest,
            state: 'PUBLISHED',
          },
        }),
        putToBD(`reviewRequests/${taskScore.reviewRequestId}`, reviewRequest)
      );
    }
  };

  getTaskScore = () => {
    const { taskScore, isTaskScoreExist, taskId, task } = this.state;
    const taskScoresBD = getFromBD('taskScores');
    taskScoresBD.then((res) => {
      let currentTaskScore;
      for (const key in res) {
        if (res[key].reviewRequestId === taskScore.reviewRequestId) {
          currentTaskScore = res[key];
        }
      }
      this.setState({
        taskScore: isTaskScoreExist
          ? currentTaskScore
          : {
              taskScoreId: `${taskId}`,
              reviewRequestId: taskScore.reviewRequestId,
              subTasks: task?.subTasks.map(() => ({ score: 0, comment: '' })),
            },
      });
    });
  };

  createSubTaskScoreObject = (index, key, value) => {
    this.setState((prevState) => {
      const newArray = [...prevState.taskScore.subTasks];
      newArray[index] = { ...newArray[index], [key]: value };
      return {
        taskScore: {
          ...prevState.taskScore,
          subTasks: newArray,
        },
      };
    });
  };

  render() {
    const { task, taskScore } = this.state;
    return task !== null ? (
      <div className="selfcheck_container">
        <Title level={1} key={1}>
          {task.name}
        </Title>
        {task?.subTasks.map((item, index) => {
          const prevCategory = task.subTasks[index === 0 ? 0 : index - 1].category;
          let shouldShowCategory = true;
          if (item.category === prevCategory && index !== 0) {
            shouldShowCategory = false;
          } else {
            shouldShowCategory = true;
          }
          return (
            <>
              <Subtask
                item={item}
                index={index}
                onChange={this.onChange}
                createSubTaskScoreObject={this.createSubTaskScoreObject}
                shouldShowCategory={shouldShowCategory}
                taskScore={taskScore}
              />
            </>
          );
        })}
        <div className="button_submit__container">
          <Button type="primary" onClick={this.handleSubmit}>
            Отправить на проверку
          </Button>
        </div>
      </div>
    ) : null;
  }
}

export default Selfcheck;
