import React from 'react';

import { Typography, Box } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<Props> = ({ children, value, index, ...other }) => (
  <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);
