import React from 'react';

import { Box, Typography, Stack } from '@mui/material';

import { Paper } from '@components/Paper';

interface Props {
  title: string;
  tooltip?: string;
}

export const StatisticalTest: React.FC<Props> = ({ title, tooltip, children }) => {
  return (
    <Paper>
      <Box sx={{ border: '1px solid green', flexGrow: '1' }}>
        <Typography variant='body1'>{title}</Typography>
        <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>
      </Box>
    </Paper>
  );
};
