import React from 'react';
import Hoc from "../Hoc/Hoc";
import {connect} from "react-redux";
import {requests} from "../../Actions/Actions";
import './App.scss';

const App = (props: any) => {
    // const service = props.service;
    // const loaded = props.loaded;
    // console.log(service, loaded);

    // const handleClickPost = () => {
    //     service.testMethodPost("http://localhost:3004/users", { username: 'example' })
    //         .then((res: any)=>console.log(res));
    // };
    //
    // const handleClickGet = () => {
    //     service.testMethodGet("http://localhost:3004/users")
    //         .then((res:any)=>console.log(res));
    // };

  return (
    <div className="App">
        APP
        {/*<button onClick={handleClickPost}>*/}
        {/*    POST*/}
        {/*</button>*/}
        {/*<button onClick={handleClickGet}>*/}
        {/*    GET*/}
        {/*</button>*/}
    </div>
  );
};

// const mapStateToProps = (state: any) => {
//     return {
//         loaded: state.loaded
//     }
// };

// const mapDispatchToProps = {requests};

export default App;
