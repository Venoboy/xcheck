import firebase from 'firebase';
import { Task, User } from '../Reducer/reducer';

const API_KEY = 'AIzaSyDzqqVu_zSTm33lzJmSTRwgNyTbUib_B2w';
const app = firebase.initializeApp({
  apiKey: API_KEY,
  databaseURL: 'https://x-check-9d19c.firebaseio.com/',
});
const db = app.database();

export default class Services {
  postNewTask = async (data: Task) => {
    return db.ref('/tasks').push(data);
  };

  putTask = async (data: Task, taskName: string) => {
    return db.ref(`/tasks/${taskName}`).set(data);
  };

  getTask = async (taskName: string) => {
    return new Promise((resolve) =>
      db.ref(`/tasks/${taskName}`).on('value', (snapshot) => {
        resolve(snapshot.toJSON());
      })
    );
  };

  getAllTasks = async () => {
    return new Promise((resolve) =>
      db.ref('/tasks').on('value', (snapshot) => {
        resolve(snapshot.toJSON() || {});
      })
    );
  };

  postNewUser = async (user: User) => {
    return db.ref(`/users`).push(user);
  };
}
