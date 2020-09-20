import { message } from 'antd';

export default class Service {
  postNewTask = async (data: any = {}) => {
    const url =
      'https://cors-anywhere.herokuapp.com/https://x-check-9d19c.firebaseio.com/tasks.json';
    try {
      const res: any = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      message.success('Created New Task');
      return res.json();
    } catch (e) {
      message.error('Ups cannot Created New Task');
      return e;
    }
  };

  putTask = async (data: any = {}, taskName: string) => {
    const url = `https://cors-anywhere.herokuapp.com/https://x-check-9d19c.firebaseio.com/tasks/${taskName}.json`;
    try {
      const res: any = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      message.success('Save Change');
      return res.json();
    } catch (e) {
      message.error('UPS Save Change');
      return e;
    }
  };

  getTask = async (taskName: any) => {
    const url = `https://x-check-9d19c.firebaseio.com/tasks/${taskName}.json`;
    try {
      const res: any = await fetch(url);
      message.success('Received TASK from the server');
      return res.ok ? res.json() : res;
    } catch (e) {
      message.error('UPS cannot Received TASK from the server');
      return e;
    }
  };

  delTask = async (taskName: string) => {
    const url = `https://x-check-9d19c.firebaseio.com/tasks/${taskName}.json`;
    try {
      const res: any = await fetch(url, { method: 'DELETE' });
      message.success('Task Deleted');
      return res.ok ? res : res;
    } catch (e) {
      message.error('Task No Deleted');
      return e;
    }
  };

  getAllTasks = async () => {
    const url = 'https://x-check-9d19c.firebaseio.com/tasks.json';
    try {
      const res: any = await fetch(url);
      message.success('Received data from the server');
      return res.ok ? res.json() : res;
    } catch (e) {
      message.error('Received data from the server');
      return e;
    }
  };

  postNewUser = async (user: any = {}) => {
    const url =
      'https://cors-anywhere.herokuapp.com/https://x-check-9d19c.firebaseio.com/users.json';
    const res: any = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    return res.json();
  };
}
