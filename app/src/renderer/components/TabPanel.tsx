import React from 'react';

import { Box } from '@mui/material';

interface Props {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export const TabPanel: React.FC<Props> = ({ children, value, index, ...other }) => (
  <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);
