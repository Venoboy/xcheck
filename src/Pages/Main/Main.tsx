import React from 'react';
import Navbar from './Navbar/Navbar';
import './Main.scss';

const Main: React.FC = () => {
  return (
    <div className="main">
      <div className="main-content">
        <div className="ant-row" style={{ margin: '0 -12px' }}>
          <div
            className="ant-col ant-col-xs-24 ant-col-sm-12 ant-col-md-10 ant-col-lg-8"
            style={{ padding: '0 12px', marginBottom: '15px' }}
          >
            <Navbar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
