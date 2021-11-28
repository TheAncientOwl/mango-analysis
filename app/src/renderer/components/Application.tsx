import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Box, Paper, ThemeProvider } from '@mui/material';

import { TopBar } from './TopBar';
import { MenuDrawer } from './MenuDrawer';

import { SectionsArray, theme } from '../config';

const Application: React.FC = () => {
  const [currentSectionTitle, setCurrentSectionTitle] = useState(SectionsArray[0].name);
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <Box sx={{ minHeight: '100vh', bgcolor: 'secondary.light' }}>
          <TopBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

          <Box sx={{ display: 'flex' }}>
            <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

            <Paper sx={{ flexGrow: 1, m: 1.5, p: 1 }}>
              <Routes>
                {SectionsArray.map((route, index) => (
                  <Route key={index} path={route.routePath} element={route.element} />
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
