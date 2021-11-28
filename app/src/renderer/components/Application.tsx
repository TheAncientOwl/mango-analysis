import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Box, Paper, ThemeProvider } from '@mui/material';

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
        <Box sx={{ minHeight: '100vh', bgcolor: 'secondary.light' }}>
          <TopBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

          <Box sx={{ display: 'flex' }}>
            <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

            <Paper sx={{ flexGrow: 1, m: 1.5, p: 1 }}>
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
