import React from 'react';
import ReactDOM from 'react-dom';
import { inDev } from '@common/helpers';
import Application from './components/Application';

console.log('[Info] : Renderer execution started');

// Render application in DOM
ReactDOM.render(<Application />, document.getElementById('app'));

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
