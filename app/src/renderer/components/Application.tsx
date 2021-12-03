import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Paper, ThemeProvider, Toolbar, Stack } from '@mui/material';

import { AppTitleBar } from './AppTitleBar';
import { MenuDrawer } from './MenuDrawer';

import { SectionsConfig, theme } from '../config';

import { useSwitch } from '@renderer/hooks/useSwitch';

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
const Application: React.FC = () => {
  const [currentSectionTitle, setCurrentSectionTitle] = useState(SectionsConfig[0].name);
  const [menuOpen, toggleMenu] = useSwitch(false);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <AppTitleBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

        <Stack direction='column' sx={{ width: '100vw', height: '100vh' }}>
          <Toolbar variant='dense' />

          <Stack direction='row' sx={{ flex: 1, minWidth: 0, minHeight: 0, bgcolor: 'secondary.main' }}>
            <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

            <Paper
              sx={{
                m: 1.5,
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
                {SectionsConfig.map((section, index) => (
                  <Route key={index} path={section.routePath} element={section.element} />
                ))}
              </Routes>
            </Paper>
          </Stack>
        </Stack>
      </ThemeProvider>
    </HashRouter>
  );
};

export default hot(module)(Application);
