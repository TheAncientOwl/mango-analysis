import '@styles/app-bar.css';

import React from 'react';

import { AppBar as MuiAppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { WindowControls } from '@config/.';

interface Props {
  title: string;
  onMenuButtonClick: () => void;
}

const spacer = <Box sx={{ flexGrow: 1 }} />;

export const AppBar: React.FC<Props> = ({ onMenuButtonClick, title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <MuiAppBar position='fixed' className='draggable' sx={{ zIndex: theme => theme.zIndex.tooltip + 100 }}>
        <Toolbar variant='dense'>
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

          <Typography variant='body1' component='div' sx={{ mr: 2 }}>
            Mango
          </Typography>

          {spacer}

          <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>

          {spacer}

          {WindowControls.map((control, index) => (
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
          ))}
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
};
