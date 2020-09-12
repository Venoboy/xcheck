import initialState from '../initialState/initialState';

type actionsType = {
  type: string;
  payload: any;
};

const reducer = (state: any = initialState, actions: actionsType) => {
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
