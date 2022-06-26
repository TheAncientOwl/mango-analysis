import React from 'react';

import { Collapse, Stack, Typography } from '@mui/material';

import { Paper } from '@components/Paper';
import { RunButton } from '@components/buttons';

interface Props {
  name: string;
  trainError: number | undefined;
  testError: number | undefined;
  onRun: () => void;
}

export const Model: React.FC<Props> = props => {
  return (
    <Paper sx={{ p: 3, pb: 0, display: 'block' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center' gap={1} mb={2}>
        <Typography>{props.name}</Typography>
        <RunButton onClick={props.onRun} size='small'>
          run
        </RunButton>
      </Stack>

      <Collapse in={props.trainError !== undefined && props.testError !== undefined}>
        <Stack direction='column' gap={2} pl={1} mb={3}>
          <Typography>Train Error: {props.trainError}</Typography>
          <Typography>Test Error: {props.testError}</Typography>
        </Stack>
      </Collapse>
    </Paper>
  );
};
