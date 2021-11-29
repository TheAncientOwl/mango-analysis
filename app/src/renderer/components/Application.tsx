import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Box, Paper, ThemeProvider, Toolbar } from '@mui/material';

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

        <Box sx={{ height: '100vh', display: 'flex', bgcolor: 'secondary.light' }}>
          <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

          <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
            <Toolbar />
            <Paper sx={{ height: '100%', m: 1.5, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              <Routes>
                {SectionsConfig.map((section, index) => (
                  <Route key={index} path={section.routePath} element={section.element} />
                ))}
              </Routes>
            </Paper>
          </Box>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
};

export default hot(module)(Application);
