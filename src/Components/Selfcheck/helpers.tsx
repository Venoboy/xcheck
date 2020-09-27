export const putToBD = async (path: string, data: any) => {
  try {
    const url = `https://x-check-9d19c.firebaseio.com/${path}.json`;
    const res: any = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.ok ? res.json() : res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return null;
};
export const getFromBD = async (path: string) => {
  try {
    const url = `https://x-check-9d19c.firebaseio.com/${path}.json`;
    const res = await fetch(url);
    return res.ok ? res.json() : res;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
  return null;
};
export const postToBD = async (path: any, data: any = {}) => {
  const url = `https://x-check-9d19c.firebaseio.com/${path}.json`;
  const res: any = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
