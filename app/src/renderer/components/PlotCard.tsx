import React from 'react';

import { Collapse, Stack, Typography } from '@mui/material';

import { Paper } from '@components/Paper';
import { Image } from '@components/Image';
import { PlotButton } from '@components/buttons';

interface Props {
  title: string;
  src: string;
  alt: string;
  onPlot: () => void;
}

export const PlotCard: React.FC<Props> = props => {
  return (
    <Paper sx={{ p: 2, pb: 0 }}>
      <Stack direction='row' alignItems='center' gap={2} mb={2}>
        <Typography>{props.title}</Typography>
        <PlotButton size='small' onClick={props.onPlot}>
          plot
        </PlotButton>
      </Stack>

      <Collapse in={props.src !== ''}>
        <Image src={props.src} alt={props.alt} />
      </Collapse>
    </Paper>
  );
};
