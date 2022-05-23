import React from 'react';

import { Box, Typography, Stack, Badge, Button, Collapse } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import BoltIcon from '@mui/icons-material/Bolt';

import { Tooltip } from '@components/Tooltip';
import { Paper } from '@components/Paper';

interface TestValueConfig {
  symbol: string;
  value: number;
  tooltip: string;
}

interface Props {
  title: string;
  tooltip?: string;
  values: TestValueConfig[];
  onTest: () => void;
}

const TestValue: React.FC<TestValueConfig> = ({ symbol, value, tooltip }) => {
  return (
    <Box>
      <Badge
        sx={{ mr: 2 }}
        badgeContent={
          <Tooltip title={tooltip} placement='right'>
            <InfoIcon sx={{ color: 'info.main', fontSize: '15px', ml: 2 }} />
          </Tooltip>
        }>
        {symbol}
      </Badge>
      {' = '}
      {value}
    </Box>
  );
};

export const StatisticalTest: React.FC<Props> = ({ title, tooltip, values, onTest }) => {
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

          <Button startIcon={<BoltIcon />} sx={{ ml: 2 }} size='small' onClick={onTest}>
            run test
          </Button>
        </Stack>

        <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>

        <Collapse in={values[0].value !== undefined}>
          <Stack direction='column' gap={1} pl={2} mt={2}>
            {values.map((value, index) => (
              <TestValue key={index} symbol={value.symbol} value={value.value} tooltip={value.tooltip} />
            ))}
          </Stack>
        </Collapse>
      </Box>
    </Paper>
  );
};
