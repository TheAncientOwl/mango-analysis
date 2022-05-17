import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { setAppTitle } from '@store/app-global/actions';

import { Box, List, Toolbar, ListItemIcon, ListItemText, ListItemButton } from '@mui/material';

import { AppRoutes } from '@config/.';

import { AppMenuDrawer } from './AppMenuDrawer';

const AppMenu: React.FC<PropsFromRedux> = props => {
  return (
    <AppMenuDrawer variant='permanent' open={props.open}>
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
              onClick={() => props.setAppTitle(section.name)}>
              <ListItemIcon sx={{ color: 'secondary.main' }}>{section.icon}</ListItemIcon>
              <ListItemText sx={{ textTransform: 'capitalize' }}>{section.alias}</ListItemText>
            </ListItemButton>
          ))}
        </List>
      </Box>
    </AppMenuDrawer>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  open: state.appGlobal.menuOpen,
  importedData: state.dataManager.importedData,
});

const mapDispatch = {
  setAppTitle,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(AppMenu);
// </redux>
