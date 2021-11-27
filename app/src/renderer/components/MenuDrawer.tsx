import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { SectionsConfig } from './SectionsConfig';

const drawerWidth = 180;

interface Props {
  onItemClick: (itemName: string) => void;
}

export const MenuDrawer: React.FC<Props> = ({ onItemClick }) => {
  return (
    <Box sx={{ display: 'flex', bgcolor: 'primary.main' }}>
      <Drawer
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}>
        <Toolbar />
        <Box sx={{ overflow: 'auto', bgcolor: 'primary.main', flexGrow: 1 }}>
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
