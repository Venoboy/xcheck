import React from 'react';
import 'antd/dist/antd.css';
import './App.scss';

const App: React.FC = ({ children }) => {
  return <div className="App">{children}</div>;
};

export default App;
