import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Paper, ThemeProvider, Toolbar, Stack } from '@mui/material';

import { TopBar } from './TopBar';
import { MenuDrawer } from './MenuDrawer';

import { SectionsConfig, theme } from '../config';

import { useSwitch } from '@renderer/hooks/useSwitch';

const Application: React.FC = () => {
  const [currentSectionTitle, setCurrentSectionTitle] = useState(SectionsConfig[0].name);
  const [menuOpen, toggleMenu] = useSwitch(true);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <TopBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

        <Stack direction='row' sx={{ height: '100vh' }}>
          <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

          <Stack direction='column' sx={{ flexGrow: 1, bgcolor: 'secondary.main', minWidth: 0, minHeight: 0 }}>
            <Toolbar variant='dense' />
            <Paper sx={{ flexGrow: 1, m: 1.5 }}>
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
