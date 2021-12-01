import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line import/no-unresolved
import { inDev } from '@common/helpers';

import { CssBaseline } from '@mui/material';

import Application from './components/Application';
import { useCache } from './hooks/useCache';

useCache.Clear();

// Render application in DOM
ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <Application />
  </React.Fragment>,
  document.getElementById('app')
);

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
