const getNewDateFormat = (date: string) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear();
  const month = `0${newDate.getMonth() + 1}`;
  const day = `0${newDate.getDate()}`;
  return `${year}/${month.substr(-2)}/${day.substr(-2)}`;
};

export default getNewDateFormat;
