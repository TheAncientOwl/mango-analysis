/* eslint-disable import/no-unresolved */
import React from 'react';
import { hot } from 'react-hot-loader';
import { Routes, Route } from 'react-router-dom';

import { Paper, Toolbar, Stack } from '@mui/material';

import { MenuDrawer } from './MenuDrawer';
import { AppTitleBar } from './app-title-bar/AppTitleBar';
import { AppRoutes } from '../config';
import { useSwitch } from '@renderer/hooks/useSwitch';

const Application: React.FC = () => {
  const [currentSectionTitle, setCurrentSectionTitle] = React.useState(AppRoutes[0].name);
  const [menuOpen, toggleMenu] = useSwitch(false);

  return (
    <React.Fragment>
      <AppTitleBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

      <Stack direction='column' sx={{ width: '100vw', height: '100vh' }}>
        <Toolbar variant='dense' />

        <Stack direction='row' sx={{ flex: 1, minWidth: 0, minHeight: 0, bgcolor: 'secondary.main' }}>
          <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

          <Paper
            sx={{
              m: 1,
              flex: 1,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              '> *': {
                minWidth: 0,
                minHeight: 0,
              },
            }}>
            <Routes>
              {AppRoutes.map((section, index) => (
                <Route key={index} path={section.routePath} element={section.element} />
              ))}
            </Routes>
          </Paper>
        </Stack>
      </Stack>
    </React.Fragment>
  );
};

export default hot(module)(Application);

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
