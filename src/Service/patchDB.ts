const patchDB = async (path: string, data: any) => {
  try {
    const url = `https://x-check-9d19c.firebaseio.com/${path}.json`;
    const res: any = await fetch(url, {
      method: 'PATCH',
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

export default patchDB;
