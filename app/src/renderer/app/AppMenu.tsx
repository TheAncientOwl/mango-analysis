import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';

import { Box, List, Toolbar, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';
// eslint-disable-next-line import/named
import { styled, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';

import { AppRoutes } from '@config/.';

const DrawerWidth = {
  opened: 195,
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

interface MenuDrawerProps {
  open: boolean;
  onItemClick: (itemName: string) => void;
}

type Props = MenuDrawerProps & PropsFromRedux;

const AppMenu: React.FC<Props> = props => {
  return (
    <Drawer variant='permanent' open={props.open}>
      <Toolbar variant='dense' />
      <Box sx={{ bgcolor: 'grey.900', flexGrow: 1 }}>
        <List>
          {AppRoutes.map((section, index) => (
            <ListItemButton
              disabled={index > 0 && !props.importedData}
              component={Link}
              to={section.routePath}
              key={index}
              sx={{ color: 'text.primary' }}
              onClick={() => props.onItemClick(section.name)}>
              <ListItemIcon sx={{ color: 'secondary.main' }}>{section.icon}</ListItemIcon>
              <ListItemText sx={{ textTransform: 'capitalize' }}>{section.alias}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  importedData: state.dataManager.importedData,
});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppMenu);
// </redux>
