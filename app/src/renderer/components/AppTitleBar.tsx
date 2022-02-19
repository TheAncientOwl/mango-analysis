import React from 'react';

import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import { WindowControls } from '@renderer/config';

interface Props {
  title: string;
  onMenuButtonClick: () => void;
}

export const AppTitleBar: React.FC<Props> = ({ onMenuButtonClick, title }) => {
  const menuIcon = (
    <IconButton
      className='non-draggable'
      size='small'
      edge='start'
      color='inherit'
      aria-label='menu'
      sx={{ mr: 1, color: 'secondary.main' }}
      onClick={onMenuButtonClick}>
      <MenuIcon />
    </IconButton>
  );

  const logo = (
    <Typography variant='body1' component='div' sx={{ mr: 2 }}>
      Mango
    </Typography>
  );

  const spacer = <Box sx={{ flexGrow: 1 }} />;

  const appTitle = (
    <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
      {title}
    </Typography>
  );

  const controls = WindowControls.map((control, index) => (
    <IconButton
      key={index}
      onClick={control.action}
      className='non-draggable'
      size='small'
      edge='start'
      color='inherit'
      aria-label={`app-control-${index}`}
      sx={{ ml: 0.1 }}>
      {control.icon}
    </IconButton>
  ));

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' className='draggable' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar variant='dense'>
          {menuIcon}
          {logo}
          {spacer}
          {appTitle}
          {spacer}
          {controls}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
