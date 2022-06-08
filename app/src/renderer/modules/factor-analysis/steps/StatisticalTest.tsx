import React from 'react';

import { Box, Typography, Stack, Badge, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

import { Tooltip } from '@components/Tooltip';
import { Paper } from '@components/Paper';
import { RunButton } from '@components/buttons';

interface TestValueConfig {
  symbol: string;
  value: number;
}

interface Props {
  title: string;
  tooltip?: string;
  values: TestValueConfig[];
  onTest: () => void;
  feedback: string;
}

export const StatisticalTest: React.FC<Props> = ({ title, tooltip, values, onTest, feedback }) => {
  return (
    <Paper sx={{ display: 'block', p: 2 }}>
      <Box>
        <Stack direction='row' gap={1} pl={1} pr={2} justifyContent='space-between' alignItems='center'>
          <Badge
            badgeContent={
              <Tooltip title={tooltip} placement='right'>
                <InfoIcon sx={{ color: 'info.main', fontSize: '17px', ml: 2 }} />
              </Tooltip>
            }>
            <Typography variant='body1' pl={2}>
              {title}
            </Typography>
          </Badge>

          <RunButton size='small' onClick={onTest}>
            run test
          </RunButton>
        </Stack>

        <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>

        <Collapse in={values[0].value !== undefined}>
          <Stack direction='column' gap={1} pl={2} mt={2}>
            {values.map((test, index) => (
              <Box key={index}>
                {test.symbol}
                {' = '}
                {test.value}
              </Box>
            ))}
            <Typography mt={1} variant='body1'>
              {feedback}
            </Typography>
          </Stack>
        </Collapse>
      </Box>
    </Paper>
  );
};
