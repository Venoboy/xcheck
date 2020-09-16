export default class Service {
  // async testMethodPost(url : string = '', data:any = {}) {
  //   const res: any = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(data)
  //   });
  //   return await res.json()
  // }
  //
  // async testMethodGet(url : string = '') {
  //   const res: any = await fetch(url);
  //   return await res.json()
  // }

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
