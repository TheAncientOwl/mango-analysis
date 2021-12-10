import './app.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

// eslint-disable-next-line import/no-unresolved
import { inDev } from '@common/helpers';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from './config';
import { useCache } from './hooks/useCache';
import Application from './components/Application';

useCache.Clear();

// Render application in DOM
ReactDOM.render(
  <React.Fragment>
    <CssBaseline />
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Application />
      </ThemeProvider>
    </HashRouter>
  </React.Fragment>,
  document.getElementById('app')
);

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
