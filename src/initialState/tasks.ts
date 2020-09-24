const defaultTasks1 = {
  name: 'xCheck',
  author: 'aliaksandrtseliuk',
  description: '# Ай яй яй↵# Проверка',
  subTasks: [
    {
      category: 'Basic',
      description: 'Минимальная ширина, при которой приложение отображается корректно – 320 рх',
      mentorCheck: false,
      score: 100,
      title: 'Проверка 1',
    },
    {
      title: 'Проверка 2',
      category: 'Fine',
      mentorCheck: true,
      description:
        'любой сбой/поломка приложения, связанная с действиями' +
        ' пользователя. Например,' +
        ' неправильный подсчёт баллов, нет перехода на следующую страницу, ' +
        'выводится неверная информация и т.д. ' +
        'Этот пункт не касается ошибок в консоли',
      score: 20,
    },
  ],
  state: 'Draft',
};

const defaultTasks2 = {
  name: 'Songbird',
  author: 'aliaksandrtseliuk',
  description: '# Ай яй яй# Проверка 2',
  subTasks: [
    {
      category: 'Basic',
      description: 'Минимальная ширина, при которой приложение отображается корректно – 320 рх',
      mentorCheck: false,
      score: 100,
      title: 'Проверка 1',
    },
    {
      title: 'Проверка 2',
      category: 'Fine',
      mentorCheck: true,
      description:
        'любой сбой/поломка приложения, связанная с действиями' +
        ' пользователя. Например,' +
        ' неправильный подсчёт баллов, нет перехода на следующую страницу, ' +
        'выводится неверная информация и т.д. ' +
        'Этот пункт не касается ошибок в консоли',
      score: 20,
    },
  ],
  state: 'Draft',
};

const tasks = {
  MH6LY96FSOLrKaoKE: defaultTasks1,
  MH6LnTePa2cTDVQjx: defaultTasks2,
};

export default tasks;
