import { hot } from 'react-hot-loader';
import React, { useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';

import { Box, ThemeProvider } from '@mui/material';

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
        <TopBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

        <Box sx={{ display: 'flex' }}>
          <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

          <Routes>
            {SectionsArray.map((route, index) => (
              <Route key={index} path={route.routePath} element={route.element} />
            ))}
          </Routes>
        </Box>
      </ThemeProvider>
    </HashRouter>
  );
};

export default hot(module)(Application);
