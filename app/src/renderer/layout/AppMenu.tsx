import React from 'react';
import { Link } from 'react-router-dom';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { setAppTitle } from '@store/app-global/actions';

import { Box, List, Toolbar, ListItemIcon, ListItemText, ListItemButton, Typography, Zoom } from '@mui/material';

import { AppRoutes } from '@config/.';

import { AppMenuDrawer } from './AppMenuDrawer';
import { Tooltip } from '@components/Tooltip';

const AppMenu: React.FC<PropsFromRedux> = props => {
  return (
    <AppMenuDrawer variant='permanent' open={props.open}>
      <Toolbar variant='dense' />
      <Box sx={{ bgcolor: 'grey.900', flexGrow: 1 }}>
        <List>
          {AppRoutes.map((section, index) => (
            <Tooltip
              key={index}
              placement='right'
              TransitionComponent={Zoom}
              title={<Typography sx={{ textTransform: 'capitalize' }}>{section.alias}</Typography>}>
              <ListItemButton
                alignItems='flex-start'
                disabled={index > 0 && !props.importedData}
                component={Link}
                to={section.routePath}
                sx={{ color: 'text.primary' }}
                onClick={() => props.setAppTitle(section.name)}>
                <ListItemIcon sx={{ color: 'secondary.main' }}>{section.icon}</ListItemIcon>
                <ListItemText
                  primaryTypographyProps={{
                    variant: 'subtitle2',
                    style: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textTransform: 'capitalize',
                    },
                  }}>
                  {section.alias}
                </ListItemText>
              </ListItemButton>
            </Tooltip>
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
