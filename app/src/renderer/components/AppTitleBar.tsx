import React from 'react';

import { AppBar, Box, Toolbar, Typography, IconButton } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface WindowControl {
  icon: React.ReactNode;
  action: () => void;
}

console.log(window.electronAPI);

const WindowControls: ReadonlyArray<WindowControl> = [
  {
    icon: <KeyboardArrowDownIcon />,
    action: window.electronAPI.minimizeAppWindow,
  },
  {
    icon: <KeyboardArrowDownIcon sx={{ transform: 'rotate(180deg)' }} />,
    action: window.electronAPI.toggleMaximizeAppWindow,
  },
  {
    icon: <CloseIcon sx={{ transform: 'scale(0.9)' }} />,
    action: window.electronAPI.closeAppWindow,
  },
];

const Spacer = () => <Box sx={{ flexGrow: 1 }} />;

interface Props {
  title: string;
  onMenuButtonClick: () => void;
}

export const AppTitleBar: React.FC<Props> = ({ onMenuButtonClick, title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' className='draggable' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
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
            DataMaster
          </Typography>

          <Spacer />

          <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
            {title}
          </Typography>

          <Spacer />

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
      </AppBar>
    </Box>
  );
};
