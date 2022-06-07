import React from 'react';

import { Paper } from '@mui/material';

export const AppPaper: React.FC = ({ children }) => {
  return (
    <Paper
      sx={{
        m: 1,
        flex: 1,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        '> *': {
          minWidth: 0,
          minHeight: 0,
        },
        position: 'relative',
      }}>
      {children}
    </Paper>
  );
};
