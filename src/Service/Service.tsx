import firebase from 'firebase/app';
import 'firebase/database';
import { message } from 'antd';
import { CrossCheckSession, Review, Task, TaskScore, User } from '../Reducer/reducer';

const API_KEY = 'AIzaSyDzqqVu_zSTm33lzJmSTRwgNyTbUib_B2w';
const app = firebase.initializeApp({
  apiKey: API_KEY,
  databaseURL: 'https://x-check-9d19c.firebaseio.com/',
});
const db = app.database();

function normalizeTask(task: Task) {
  return {
    ...task,
    subTasks: Object.values(task.subTasks),
  };
}

function normalizeTaskScore(taskScore: TaskScore) {
  return {
    ...taskScore,
    subTasks: Object.values(taskScore.subTasks),
  };
}
function normalizeReview(review: Review) {
  return {
    ...review,
    subTasks: Object.values(review.subTasks),
  };
}

function normalizeCheckSession(session: CrossCheckSession) {
  if (session.crossCheck) {
    return {
      ...session,
      crossCheck: {
        ...session.crossCheck,
        attendees: Object.values(session.crossCheck.attendees),
      },
    };
  }
  return session;
}

export default class Services {
  postNewTask = async (data: Task) => {
    return db
      .ref('/tasks')
      .push(data)
      .then((newTask) => {
        message.success('Created New Task');
        return newTask;
      })
      .catch(() => {
        message.error('Ups cannot Created New Task');
      });
  };

  putTask = async (data: Task, taskName: string) => {
    return db
      .ref(`/tasks/${taskName}`)
      .set(data)
      .then((task) => {
        message.success('Save Change');
        return task;
      })
      .catch(() => {
        message.error('UPS Save Change');
      });
  };

  getTask = async (taskName: string) => {
    const ref = db.ref(`/tasks/${taskName}`);
    return new Promise((resolve) =>
      ref.on('value', function onTaskValue(snapshot) {
        ref.off('value', onTaskValue);
        resolve(normalizeTask(snapshot.toJSON() as Task));
      })
    );
  };

  getTaskScoreByRequestId = (requestId: string) => {
    const ref = db.ref('/taskScores');
    return new Promise((resolve) => {
      ref
        .orderByChild('reviewRequestId')
        .equalTo(requestId)
        .on('child_added', function onChildTaskScore(snapshot) {
          ref.off('child_added', onChildTaskScore);
          resolve(normalizeTaskScore({ ...snapshot.toJSON(), id: snapshot.key } as TaskScore));
        });
    });
  };

  getReviewRequestBySessionId = (checkSessionId: string) => {
    const ref = db.ref('/reviewRequests');
    return new Promise((resolve) => {
      ref
        .orderByChild('checkSessionId')
        .equalTo(checkSessionId)
        .on('child_added', function onChildReviewRequest(snapshot) {
          ref.off('child_added', onChildReviewRequest);
          resolve({
            ...snapshot.toJSON(),
            id: snapshot.key,
          });
        });
    });
  };

  getReviewByTaskScoreId = (taskScoreId: string) => {
    const ref = db.ref('/reviews');
    return new Promise((resolve) => {
      ref
        .orderByChild('taskScoreId')
        .equalTo(taskScoreId)
        .on('child_added', function onChildReview(snapshot) {
          ref.off('child_added', onChildReview);
          resolve(
            normalizeReview({
              ...(snapshot.toJSON() as Review),
              id: String(snapshot.key),
            })
          );
        });
    });
  };

  putTaskScore = (id: string, taskScore: TaskScore) => {
    return db.ref(`/taskScores/${id}`).set(taskScore);
  };

  getCheckSession = (sessionId: string) => {
    const ref = db.ref(`/checkSessions/${sessionId}`);
    return new Promise((resolve) => {
      ref.on('value', function onCheckSessionValue(snapshot) {
        ref.off('value', onCheckSessionValue);
        resolve(normalizeCheckSession(snapshot.toJSON() as CrossCheckSession));
      });
    });
  };

  getAllUsers = () => {
    const ref = db.ref('/users');
    return new Promise((resolve) => {
      ref.on('value', function onAllUsers(snapshot) {
        ref.off('value', onAllUsers);
        resolve(snapshot.toJSON());
      });
    });
  };

  delTask = async (taskName: string) => {
    return db
      .ref(`/tasks/${taskName}`)
      .remove()
      .then(() => {
        message.success('Task Deleted');
      })
      .catch(() => message.error('Task No Deleted'));
  };

  getAllTasks = async () => {
    const ref = db.ref('/tasks');
    return new Promise((resolve, reject) =>
      ref.on('value', function onAllTasks(snapshot) {
        if (snapshot.val()) {
          message.success('Received data from the server');
          ref.off('value', onAllTasks);
          resolve(
            Object.fromEntries(
              Object.entries(snapshot.toJSON() || {}).map(([key, task]) => [
                key,
                normalizeTask(task),
              ])
            )
          );
        } else {
          reject(message.error('Received data from the server'));
        }
      })
    );
  };

  getAllCheckSessions = () => {
    return new Promise((resolve) => {
      const ref = db.ref('/checkSessions');
      ref.on('value', function onAllCheckSessions(snapshot) {
        ref.off('value', onAllCheckSessions);
        resolve(
          Object.fromEntries(
            Object.entries(snapshot.toJSON() || {}).map(([key, checkSession]) => [
              key,
              normalizeCheckSession(checkSession),
            ])
          )
        );
      });
    });
  };

  postNewUser = async (user: User) => {
    return db.ref(`/users`).push(user);
  };

  postTaskReview = async (review: Review) => {
    return db.ref('/reviews').push(review);
  };

  putTaskReview = (id: string, review: Review) => {
    return db.ref(`/reviews/${id}`).set(review);
  };

  postTaskScore = async (taskScore: TaskScore) => {
    return db.ref('/taskScores').push(taskScore);
  };

  postCheckSession = (session: CrossCheckSession) => {
    return db.ref('/checkSessions').push(session);
  };

  putCheckSession = (sessionId: string, session: CrossCheckSession) => {
    return db.ref(`/checkSessions/${sessionId}`).set(session);
  };
}
