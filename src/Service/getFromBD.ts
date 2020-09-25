const getFromBD = async (path: string) => {
  try {
    const url = `https://x-check-9d19c.firebaseio.com/${path}.json`;
    const res: any = await fetch(url);
    return res.ok ? res.json() : res;
  } catch (e) {
    console.log(e);
  }
  return null;
};

export default getFromBD;
