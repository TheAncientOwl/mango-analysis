import React from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import MuiDrawer from '@mui/material/Drawer';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
// eslint-disable-next-line import/named
import { styled, Theme, CSSObject } from '@mui/material/styles';

import { SectionsArray } from '../configs/sectionsConfig';
import { Link } from 'react-router-dom';

const drawerWidth = 180;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface Props {
  open: boolean;
  onItemClick: (itemName: string) => void;
}

export const MenuDrawer: React.FC<Props> = ({ open, onItemClick }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'primary.main' }}>
      <Drawer variant='permanent' open={open}>
        <Toolbar />
        <Box sx={{ bgcolor: 'primary.main', flexGrow: 1 }}>
          <List>
            {SectionsArray.map((section, index) => (
              <ListItemButton
                component={Link}
                to={section.routePath}
                key={index}
                sx={{ color: 'primary.contrastText' }}
                onClick={() => onItemClick(section.name)}>
                <ListItemIcon sx={{ color: 'inherit' }}>{section.icon}</ListItemIcon>
                <ListItemText sx={{ textTransform: 'capitalize' }}>{section.name}</ListItemText>
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
