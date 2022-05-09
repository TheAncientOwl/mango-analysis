import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import { inDev } from '@common/helpers';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { theme } from '@renderer/config';
import App from './App';

import { Provider } from 'react-redux';
import { store } from '@renderer/store';

// Render application in DOM
ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <HashRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('app')
);

// Hot module replacement
if (inDev() && module.hot) module.hot.accept();
