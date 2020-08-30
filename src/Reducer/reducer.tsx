type stateType = {
  loaded: boolean
  user: string | null
}

const initialState: stateType = {
  loaded: false,
  user: null
};

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case "REQUESTS":
      return {
        ...state,
        loaded: true,
      };

    case "SET_USER":
      return {
          ...state,
        user: actions.payload
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
