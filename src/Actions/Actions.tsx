type requestsType = {type:"REQUESTS"}
const requests = ():requestsType => {
  return {
    type: "REQUESTS",
  };
};

type setUserType = {type:"SET_USER", payload:string}
const setUser = (data :string):setUserType => {
  return {
    type: "SET_USER",
    payload: data
  };
};

export {requests, setUser};
