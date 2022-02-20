import React from 'react';
import { Link } from 'react-router-dom';

import { Box, List, Toolbar, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
// eslint-disable-next-line import/named
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import { AppRoutes } from '@renderer/config';

const DrawerWidth = {
  opened: 180,
  closed: 57,
};

const openedMixin = (theme: Theme): CSSObject => ({
  width: DrawerWidth.opened,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
});

const closedMixin = (theme: Theme): CSSObject => ({
  width: DrawerWidth.closed,
  overflowX: 'hidden',
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: DrawerWidth.opened,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': {
      border: 'none',
      ...openedMixin(theme),
    },
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': {
      border: 'none',
      ...closedMixin(theme),
    },
  }),
}));

interface Props {
  open: boolean;
  onItemClick: (itemName: string) => void;
}

export const MenuDrawer: React.FC<Props> = ({ open, onItemClick }) => {
  return (
    <Drawer variant='permanent' open={open}>
      <Toolbar variant='dense' />
      <Box sx={{ bgcolor: 'grey.900', flexGrow: 1 }}>
        <List>
          {AppRoutes.map((section, index) => (
            <ListItemButton
              component={Link}
              to={section.routePath}
              key={index}
              sx={{ color: 'text.primary' }}
              onClick={() => onItemClick(section.name)}>
              <ListItemIcon sx={{ color: 'secondary.main' }}>{section.icon}</ListItemIcon>
              <ListItemText sx={{ textTransform: 'capitalize' }}>{section.name}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
