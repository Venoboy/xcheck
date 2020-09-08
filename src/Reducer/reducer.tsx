type stateType = {
  loaded: boolean;
  user: {
    userName: string;
    userId: string;
    role: string;
  };
};

const initialState: stateType = {
  loaded: false,
  user: {
    userName: 'aliaksandrtseliuk',
    userId: '1234561',
    role: 'student',
  },
};

const reducer = (state = initialState, actions: any) => {
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
