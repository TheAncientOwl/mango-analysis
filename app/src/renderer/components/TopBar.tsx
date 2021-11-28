import React from 'react';

import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  title: string;
  onMenuButtonClick: () => void;
}

const Spacer = () => <Box sx={{ flexGrow: 1 }} />;

export const TopBar: React.FC<Props> = ({ onMenuButtonClick, title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            size='medium'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 1 }}
            onClick={onMenuButtonClick}>
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' component='div' sx={{ mr: 2 }}>
            DataMaster
          </Typography>

          <Spacer />

          <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>

          <Spacer />

          <IconButton size='medium' edge='start' color='inherit' aria-label='menu' sx={{ ml: 1 }}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
};
