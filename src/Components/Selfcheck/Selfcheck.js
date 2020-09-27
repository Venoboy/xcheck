/* eslint-disable react/no-array-index-key */
import React from 'react';
import { connect } from 'react-redux';
import { Typography, Button } from 'antd';
import { Subtask } from './ components/subtask/subtask';
import { putToBD, getFromBD, postToBD } from './helpers';
import Header from '../Header/Header';
import './Selfcheck.scss';

const { Title } = Typography;

class Selfcheck extends React.Component {
  constructor(props) {
    super(props);
    const { currentCheckSessionId, currentTaskId } = this.props;
    this.state = {
      task: null,
      taskScore: {
        subTasks: [],
        reviewRequestId: '',
      },
      currentCheckSessionId,
      isTaskScoreExist: false,
      reviewRequest: {},
      taskId: currentTaskId,
    };
  }

  componentDidMount() {
    const { currentCheckSessionId } = this.state;
    const reviewRequestsFromBD = getFromBD(`reviewRequests`);
    reviewRequestsFromBD.then((resRequests) => {
      let currentReviewRequest;
      let currentReviewRequestId;
      Object.keys(resRequests).forEach((el) => {
        if (resRequests[el].checkSessionId === currentCheckSessionId) {
          currentReviewRequest = resRequests[el];
          currentReviewRequestId = el;
        }
      });
      console.log(' currentReviewRequest', currentReviewRequest);
      console.log(' currentReviewRequestId ', currentReviewRequestId);

      this.setState(
        (prevState) => ({
          ...prevState,
          taskScore: { ...prevState.taskScore, reviewRequestId: currentReviewRequestId },
          isTaskScoreExist: currentReviewRequest?.state !== 'DRAFT',
          reviewRequest: currentReviewRequest,
        }),
        () => {
          const { taskId } = this.state;
          const task = getFromBD(`tasks/${taskId}`);
          task.then((resTask) => {
            this.setState(
              (prevState) => ({
                ...prevState,
                task: resTask,
              }),
              () => this.getTaskScore()
            );
          });
        }
      );
    });
  }

  componentDidUpdate() {
    console.log('state', this.state);
  }

  handleSubmit = () => {
    const { history } = this.props;
    postToBD('taskScores/', this.state.taskScore);
    if (this.state.isTaskScoreExist === false) {
      const newReview = { ...this.state.reviewRequest };
      putToBD(`reviewRequests/${this.state.taskScore.reviewRequestId}`, {
        ...newReview,
        state: 'PUBLISHED',
      });
    }
    history.push('/submit-task');
  };

  getTaskScore = () => {
    const { taskScore, isTaskScoreExist, taskId, task } = this.state;
    const taskScoresBD = getFromBD('taskScores');
    taskScoresBD.then((res) => {
      let currentTaskScore;
      Object.keys(res).forEach((el) => {
        if (res[el].reviewRequestId === taskScore.reviewRequestId) {
          currentTaskScore = res[el];
        }
      });
      console.log('currentTaskScore', currentTaskScore);

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
        <Header />
        <Title level={1} key={1}>
          {task.name}
        </Title>
        <Title level={5} key={1}>
          Все подпункты должны быть оценены
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
          <Button type={'' || 'primary'} onClick={this.handleSubmit}>
            Отправить на проверку
          </Button>
        </div>
      </div>
    ) : null;
  }
}
const mapStatetoProps = ({ checkSessionId, selectedTaskId }) => {
  return {
    currentCheckSessionId: checkSessionId,
    currentTaskId: selectedTaskId,
  };
};
// export default Selfcheck;
export default connect(mapStatetoProps)(Selfcheck);
