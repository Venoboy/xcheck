const initialState = {
  loaded: false
};

const reducer = (state = initialState, actions: any) => {
  switch (actions.type) {
    case "REQUESTS":
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
