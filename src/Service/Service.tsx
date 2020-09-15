export default class Service {
  // postNewTask = async (data: any = {}) => {
  //   const url =
  //     'https://cors-anywhere.herokuapp.com/https://x-check-9d19c.firebaseio.com/tasks.json';
  //   const res: any = await fetch(url, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   return res.json();
  // };
  //
  // getTask = async (taskName: any) => {
  //   const url = `https://x-check-9d19c.firebaseio.com/tasks/${taskName}.json`;
  //   try {
  //     const res: any = await fetch(url);
  //     return res.ok ? res.json() : res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  //
  // getAllTasks = async () => {
  //   const url = 'https://x-check-9d19c.firebaseio.com/tasks.json';
  //   try {
  //     const res: any = await fetch(url);
  //     return res.ok ? res.json() : res;
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
}
