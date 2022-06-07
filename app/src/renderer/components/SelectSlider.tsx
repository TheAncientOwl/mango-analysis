import React from 'react';

import { Slider, Stack, Typography } from '@mui/material';
// eslint-disable-next-line import/named
import { SxProps } from '@mui/system';

import { RenderIf } from './RenderIf';

interface Props {
  sx?: SxProps;
  maxWidth?: string;
  sliderWidth?: string;
  label: string;
  min: number;
  max: number;
  showRanges?: boolean;
  onChange: (value: number) => void;
  value: number;
}

export const SelectSlider: React.FC<Props> = ({
  sx,
  maxWidth = 'auto',
  sliderWidth = 'auto',
  label,
  min,
  max,
  showRanges = true,
  onChange,
  value,
}) => {
  const handleChange = React.useCallback(
    (e, value: number) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Stack sx={sx} direction='row' justifyContent='space-between' maxWidth={maxWidth}>
      <Typography>{label}</Typography>

      <Stack direction='row' alignItems='center' gap={1}>
        <RenderIf condition={showRanges}>{min}</RenderIf>

        <Slider
          sx={{ width: sliderWidth }}
          size='small'
          onChange={handleChange}
          value={value}
          aria-label={label.split('').join('-')}
          min={min}
          max={max}
          valueLabelDisplay='on'
        />

        <RenderIf condition={showRanges}>{max}</RenderIf>
      </Stack>
    </Stack>
  );
};
