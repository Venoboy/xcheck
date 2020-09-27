const postToDB = async (path: any, data: any = {}) => {
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

export default postToDB;
