import React from 'react';
import Hoc from "../Hoc/Hoc";
import {connect} from "react-redux";
import {requests, setUser} from "../../Actions/Actions";
import './App.scss';

const App = (props: any) => {
    const service = props.service;
    const loaded = props.loaded;
    const user = props.user;
    console.log(service, loaded, user);

    const handleClickPost = () => {
        service.testMethodPost("http://localhost:3004/users", { username: 'example' })
            .then((res: any)=>console.log(res));
    };

    const handleClickGet = () => {
        console.log(service, loaded, user);
        service.testMethodGet("http://localhost:3004/users")
            .then((res:any)=>console.log(res));
    };

    const handleClickSet = () => {
        const userName = (document.getElementById('userName') as HTMLInputElement)!.value;
        props.setUser(userName);
        service.testMethodPost("http://localhost:3004/users", { username: userName })
            .then((res: any)=>console.log(res));
    };

  return (
    <div className="App">
        APP
        <button onClick={handleClickPost}>
            POST
        </button>
        <button onClick={handleClickGet}>
            GET
        </button>
        <input id={"userName"} type={"text"}/>
        <button onClick={handleClickSet}>
            SET
        </button>
    </div>
  );
};

const mapStateToProps = (state: any) => {
    return {
        loaded: state.loaded,
        user: state.user
    }
};

const mapDispatchToProps = {requests,setUser};

export default connect(mapStateToProps,mapDispatchToProps)(Hoc()(App));
