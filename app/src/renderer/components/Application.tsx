import React, { useEffect, useState } from 'react';
import { hot } from 'react-hot-loader';
import './Application.css';
import { TopBar } from './TopBar';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { MenuDrawer } from './MenuDrawer';
import Paper from '@mui/material/Paper';

const Application: React.FC = () => {
  const [currentSectionTitle, setCurrentSectionTitle] = useState('data');
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    console.log(menuOpen);
  }, [menuOpen]);

  return (
    <React.Fragment>
      <TopBar onMenuButtonClick={toggleMenu} title={currentSectionTitle} />

      <Box sx={{ display: 'flex', border: '1px solid green', minHeight: '900px' }}>
        <MenuDrawer open={menuOpen} onItemClick={setCurrentSectionTitle} />

        <Paper sx={{ m: 1, p: 2 }} elevation={8}>
          <Typography paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel. Risus at ultrices mi
            tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus. Convallis convallis tellus id
            interdum velit laoreet id donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
            suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras. Metus
            vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt.
            Cras tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum varius duis at consectetur
            lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa sapien faucibus et molestie ac.
          </Typography>
          <Typography paragraph>
            Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper eget nulla facilisi etiam
            dignissim diam. Pulvinar elementum integer enim neque volutpat ac tincidunt. Ornare suspendisse sed nisi
            lacus sed viverra tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis sed odio morbi.
            Euismod lacinia at quis risus sed vulputate odio. Morbi tincidunt ornare massa eget egestas purus viverra
            accumsan in. In hendrerit gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem et
            tortor. Habitant morbi tristique senectus et. Adipiscing elit duis tristique sollicitudin nibh sit. Ornare
            aenean euismod elementum nisi quis eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
            posuere sollicitudin aliquam ultrices sagittis orci a.
          </Typography>
        </Paper>
      </Box>
    </React.Fragment>
  );
};

export default hot(module)(Application);
