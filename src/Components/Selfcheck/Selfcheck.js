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
      currentTaskScoreId: '',
      currentCheckSessionId,
      isTaskScoreExist: false,
      isCanBeSubmitted: false,
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

  handleSubmit = () => {
    const { history } = this.props;
    const {
      isTaskScoreExist,
      taskScore,
      reviewRequest,
      isCanBeSubmitted,
      currentTaskScoreId,
    } = this.state;

    if (isTaskScoreExist === false) {
      if (isCanBeSubmitted === true) {
        const newReview = { ...reviewRequest };
        postToBD('taskScores/', taskScore);
        putToBD(`reviewRequests/${taskScore.reviewRequestId}`, {
          ...newReview,
          state: 'PUBLISHED',
        });
      }
    } else {
      putToBD(`taskScores/${currentTaskScoreId}`, taskScore);
    }
    if (isCanBeSubmitted === true) history.push('/submit-task');
  };

  getTaskScore = () => {
    const { taskScore, isTaskScoreExist, taskId, task } = this.state;
    const taskScoresBD = getFromBD('taskScores');
    taskScoresBD.then((res) => {
      let currentTaskScore;
      let currentTaskScoreId;
      Object.keys(res).forEach((el) => {
        if (res[el].reviewRequestId === taskScore.reviewRequestId) {
          currentTaskScore = res[el];
          currentTaskScoreId = el;
        }
      });
      this.setState({
        currentTaskScoreId: isTaskScoreExist ? currentTaskScoreId : '',
        isCanBeSubmitted: isTaskScoreExist,
        taskScore: isTaskScoreExist
          ? currentTaskScore
          : {
              taskScoreId: `${taskId}`,
              reviewRequestId: taskScore.reviewRequestId,
              subTasks: task?.subTasks.map((el) => {
                return {
                  score: el.category === 'Fine' ? 0 : null,
                  comment: '',
                };
              }),
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

  updateIsCanBeSubmitted = (newValue) => {
    this.setState({ isCanBeSubmitted: newValue });
  };

  render() {
    const { task, taskScore, isCanBeSubmitted } = this.state;
    return task !== null ? (
      <div className="selfcheck_container">
        <Header />
        <div className="info_selfcheck__container">
          <Title level={1}>{task.name}</Title>
          <Title level={5}>Все подпункты должны быть оценены</Title>
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
                  updateIsCanBeSubmitted={this.updateIsCanBeSubmitted}
                />
              </>
            );
          })}
          <div className="button_submit__container">
            <Button type={isCanBeSubmitted ? 'primary' : ''} onClick={this.handleSubmit}>
              Отправить на проверку
            </Button>
          </div>
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
