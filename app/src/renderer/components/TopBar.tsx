import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';

interface Props {
  title: string;
}

const Spacer = () => <Box sx={{ flexGrow: 1 }} />;

export const TopBar: React.FC<Props> = ({ title }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='fixed' sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton size='medium' edge='start' color='inherit' aria-label='menu' sx={{ mr: 1 }}>
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
