import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SectionsConfig } from './SectionsConfig';

// eslint-disable-next-line import/named
import { styled, Theme, CSSObject } from '@mui/material/styles';

import MuiDrawer from '@mui/material/Drawer';

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
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
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
            {SectionsConfig.map((section, index) => (
              <ListItem
                button
                key={index}
                sx={{ color: 'primary.contrastText' }}
                onClick={() => onItemClick(section.title)}>
                <ListItemIcon sx={{ color: 'inherit' }}>{section.icon}</ListItemIcon>
                <ListItemText sx={{ textTransform: 'capitalize' }}>{section.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};
