const putToDB = async (path: string, data: any) => {
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
    console.log(e);
  }
  return null;
};

export default putToDB;
