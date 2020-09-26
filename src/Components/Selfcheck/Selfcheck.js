/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Subtask } from './ components/subtask/subtask';
import { putToBD, getFromBD, postToBD } from './helpers';
import { ButtonSelfcheck } from './ components/buttons/buttonReview';
import { Typography } from 'antd';
import Header from '../Header/Header';
import './Selfcheck.scss';

const { Title } = Typography;

class Selfcheck extends React.Component {
  constructor(props) {
    super(props);
    const { reviewRequestId, userId } = this.props;
    this.state = {
      task: null,
      taskScore: {
        subTasks: [],
        reviewRequestId: reviewRequestId,
      },
      isTaskScoreExist: false,
      reviewRequest: {},
      taskId: 1,
      taskScores: {},
    };
    this.createSubTaskScoreObject = this.createSubTaskScoreObject.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getTaskScore = this.getTaskScore.bind(this);
  }

  handleSubmit() {
    postToBD('taskScores/', this.state.taskScore);
    if (!this.state.isTaskScoreExist) {
      this.setState(
        (prevState) => ({
          reviewRequest: {
            ...prevState.reviewRequest,
            state: 'PUBLISHED',
          },
        }),
        putToBD(`reviewRequests/${this.state.taskScore.reviewRequestId}`, this.state.reviewRequest)
      );
    }
  }

  getTaskScore() {
    let taskScores = getFromBD('taskScores');
    taskScores.then((res) => {
      let currentTaskScore;
      for (let key in res) {
        if (res[key].reviewRequestId === this.state.taskScore.reviewRequestId) {
          currentTaskScore = res[key];
        }
      }
      this.setState({
        taskScore: this.state.isTaskScoreExist
          ? currentTaskScore
          : {
              taskScoreId: `${this.state.taskId}`,
              reviewRequestId: this.state.taskScore.reviewRequestId,
              subTasks: this.state.task?.subTasks.map((el) => (el = { score: 0, comment: '' })),
            },
      });
    });
  }

  componentDidMount() {
    let reviewRequest = getFromBD(`reviewRequests/${this.state.taskScore.reviewRequestId}`);
    reviewRequest.then((res) => {
      this.setState(
        {
          isTaskScoreExist: res?.state === 'DRAFT' ? false : true,
          taskId: res?.taskId,
          reviewRequest: res,
        },
        () => {
          let task = getFromBD(`tasks/${this.state.reviewRequest.taskId}`);
          task.then((res) => {
            this.setState(
              {
                task: res,
              },
              () => this.getTaskScore()
            );
          });
        }
      );
    });
  }

  createSubTaskScoreObject(index, key, value) {
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
  }

  render() {
    return this.state.task !== null ? (
      <div className="selfcheck_container">
        {/* <Header /> */}
        <Title level={1} key={1}>
          {this.state.task.name}
        </Title>
        {this.state.task?.subTasks.map((item, index) => {
          let prevCategory = this.state.task.subTasks[index === 0 ? 0 : index - 1].category;
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
                taskScore={this.state.taskScore}
              />
            </>
          );
        })}
        <div className="button_submit__container">
          <ButtonSelfcheck text="Отправить на проверку" handleClick={this.handleSubmit} />
        </div>
      </div>
    ) : null;
  }
}

export default Selfcheck;
