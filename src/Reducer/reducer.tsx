import { stateType } from '../TsTypes/types';

type actionsType = {
  type: string;
  payload: any;
};

const defaultTask = {
  author: 'aliaksandrtseliuk',
  description: '# Ай яй яй↵# Проверка',
  id: 1,
  subTasks: [
    {
      category: 'Basic',
      description: 'Минимальная ширина, при которой приложение отображается корректно – 320 рх',
      id: 0,
      mentorCheck: false,
      score: 100,
      title: 'Проверка 1',
    },
    {
      id: 1,
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
  name: 'Проверка',
  state: 'Draft',
};

const initialState: stateType = {
  loaded: false,
  user: 'user',
  task: defaultTask,
};

const reducer = (state: stateType = initialState, actions: actionsType) => {
  switch (actions.type) {
    case 'REQUESTS':
      return {
        ...state,
        loaded: true,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
