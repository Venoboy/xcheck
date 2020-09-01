type stateType = {
  loaded: boolean;
  user: string | null;
};

const initialState: stateType = {
  loaded: false,
  user: 'user'
};

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case 'REQUESTS':
      return {
        ...state,
        loaded: true
      };

    default:
      return {
        ...state
      };
  }
};

export default reducer;
