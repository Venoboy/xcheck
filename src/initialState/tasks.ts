const defaultTasks1 = {
  name: 'xCheck',
  author: 'aliaksandrtseliuk',
  description: '# Ай яй яй↵# Проверка',
  id: 1,
  subTasks: [
    {
      category: 'Basic',
      description: 'Минимальная ширина, при которой приложение отображается корректно – 320 рх',
      id: 'a0',
      mentorCheck: false,
      score: 100,
      title: 'Проверка 1',
    },
    {
      id: 'b1',
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
  description: '# Ай яй яй↵# Проверка',
  id: 2,
  subTasks: [
    {
      category: 'Basic',
      description: 'Минимальная ширина, при которой приложение отображается корректно – 320 рх',
      id: 'a1',
      mentorCheck: false,
      score: 100,
      title: 'Проверка 1',
    },
    {
      id: 'b2',
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

const tasks = [defaultTasks1, defaultTasks2];

export default tasks;
