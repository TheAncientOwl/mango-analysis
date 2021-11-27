import React from 'react';
import { hot } from 'react-hot-loader';
import './Application.css';
import { TopBar } from './TopBar';

const Application: React.FC = () => {
  return (
    <React.Fragment>
      <TopBar title='data' />
    </React.Fragment>
  );
};

export default hot(module)(Application);
