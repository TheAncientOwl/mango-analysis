import '@styles/scrollbar.css';

import React from 'react';
import { hot } from 'react-hot-loader';
import { Routes, Route } from 'react-router-dom';

import { Toolbar, Stack } from '@mui/material';

import { AppRoutes } from '@config/.';

import AppMenu from './AppMenu';
import AppBar from './AppBar';
import { AppPaper } from './AppPaper';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <AppBar />

      <Stack direction='column' sx={{ width: '100vw', height: '100vh' }}>
        <Toolbar variant='dense' />

        <Stack direction='row' sx={{ flex: 1, minWidth: 0, minHeight: 0, bgcolor: 'secondary.main' }}>
          <AppMenu />

          <AppPaper>
            <Routes>
              {AppRoutes.map((section, index) => (
                <Route key={index} path={section.routePath} element={section.element} />
              ))}
            </Routes>
          </AppPaper>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default hot(module)(App);

/**
 * @layout
 * <app>
 * * >> fixed.
 *  <app-title-bar />
 *
 * * >> provide 100vw & 100vh app layout and merge a toolbar to compensate app-bar height.
 *  <stack column>
 *    <toolbar />
 *
 * * >> merge menu & app routes.
 *    <stack row>
 *      <menu />
 *      <paper>
 *        <app-routes/>
 *      </paper>
 *    </stack>
 *  </stack>
 * </app>
 */
