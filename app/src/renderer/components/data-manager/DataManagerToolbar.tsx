import React from 'react';

import { Stack } from '@mui/material';

import { ImportButton } from './components/ImportButton';
import { DropDataFrameButton } from './components/DropDataFrameButton';
import { DropCheckedButton } from './components/DropCheckedButton';
import { ScalingHandler } from './components/ScalingHandler';
import { DecimalsHandler } from './components/DecimalsHandler';

const VerticalLine = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export const DataManagerToolbar: React.FC = () => {
  return (
    <Stack sx={{ p: 2, gap: 1 }} direction='row'>
      <ImportButton />
      <DropDataFrameButton />
      <DropCheckedButton />
      {VerticalLine}
      <ScalingHandler />
      {VerticalLine}
      <DecimalsHandler />
    </Stack>
  );
};
