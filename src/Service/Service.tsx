import firebase from 'firebase/app';
import 'firebase/database';
import { message } from 'antd';
import { Review, Task, TaskScore, User } from '../Reducer/reducer';

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
      const ref = db.ref(`/tasks/${taskName}`)
    return new Promise((resolve) =>
      ref.on('value', function onTaskValue(snapshot) {
          ref.off("value", onTaskValue)
        resolve(normalizeTask(snapshot.toJSON() as Task));
      })
    );
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
      const ref = db.ref('/tasks')
    return new Promise((resolve, reject) =>
      ref.on('value', function onAllTasks(snapshot) {
        if (snapshot.val()) {
          message.success('Received data from the server');
          ref.off("value", onAllTasks)
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

  postNewUser = async (user: User) => {
    return db.ref(`/users`).push(user);
  };

  postTaskReview = async (review: Review) => {
    return db.ref('/reviews').push(review);
  };

  postTaskScore = async (taskScore: TaskScore) => {
    return db.ref('/taskScores').push(taskScore);
  };
}
