import React from 'react';
// import Hoc from "../Hoc/Hoc";
import 'antd/dist/antd.css';
import './App.scss';
import Dispute from '../Dispute/Dispute';

const App = () => {
  // service.testMethodPost("http://localhost:3004/users", { username: 'example' })
  //     .then((res: any)=>console.log(res));
  //
  // service.testMethodGet("http://localhost:3004/users")
  //     .then((res:any)=>console.log(res));

  return (
    <div className="App">
      <Dispute />
    </div>
  );
};

export default App;
