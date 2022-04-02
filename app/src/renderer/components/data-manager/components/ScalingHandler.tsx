import React from 'react';

import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line import/named
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
// eslint-disable-next-line import/named
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import InfoIcon from '@mui/icons-material/Info';

import { DoubleCheck } from '@renderer/components/DoubleCheck';

import { axios } from '@src/renderer/config';
import { useSwitch } from '@src/renderer/hooks';

import { ScalingMethodType, ActionType } from '../state';
import { DataManagerContext } from '../context';

const ScaleMethodTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 350,
    backgroundColor: theme.palette.info.main,
    color: theme.palette.info.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: 10,
  },
}));

interface ScalingMethodConfig {
  id: number;
  display: string;
  type: ScalingMethodType;
  tooltip: string | React.ReactNode;
}

const tooltipParagraphChar = <DoubleArrowIcon sx={{ fontSize: '10px', mr: '2px' }} />;

const ScalingMethods: ReadonlyArray<ScalingMethodConfig> = [
  {
    id: 0,
    display: 'none',
    type: 'none',
    tooltip: (
      <React.Fragment>
        <Box>{tooltipParagraphChar}Choose a scaling method</Box>
      </React.Fragment>
    ),
  },
  {
    id: 1,
    display: 'maximum-absolute',
    type: 'maximum_absolute_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Rescales each feature between -1 and 1 by dividing every observation by its maximum
          absolute value.
        </Box>
      </React.Fragment>
    ),
  },
  {
    id: 2,
    display: 'min-max',
    type: 'min_max_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Rescales the feature to a fixed range of [0,1] by subtracting the minimum value of the
          feature and then dividing by the range.
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>(often called normalization)</Box>
      </React.Fragment>
    ),
  },
  {
    id: 3,
    display: 'robust',
    type: 'robust_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}
          Transforms the data into a distribution with a mean of 0 and a standard deviation of 1.
        </Box>
        <Box>
          {tooltipParagraphChar}Each standardized value is computed by subtracting the mean of the corresponding feature
          and then dividing by the standard deviation.
        </Box>
        <Box sx={{ fontStyle: 'italic' }}>(often called standardization)</Box>
      </React.Fragment>
    ),
  },
  {
    id: 4,
    display: 'z-score',
    type: 'z_score_scaling',
    tooltip: (
      <React.Fragment>
        <Box>
          {tooltipParagraphChar}Scale each feature of the data set by subtracting the median and then dividing by the
          interquartile range.
        </Box>
        <Box>
          {tooltipParagraphChar}The interquartile range (IQR) is defined as the difference between the third and the
          first quartile.
        </Box>
      </React.Fragment>
    ),
  },
];

export const ScalingHandler: React.FC = () => {
  const { state, dispatch, fetchData } = React.useContext(DataManagerContext);

  const doubleCheckSwitch = useSwitch();

  const handleMethodChange = (event: SelectChangeEvent) => {
    dispatch({ type: ActionType.ChangeScalingMethod, payload: event.target.value as ScalingMethodType });
  };

  const handleScale = async () => {
    doubleCheckSwitch.off();

    dispatch({ type: ActionType.Loading });

    await axios.post('/data/scale', {
      method: state.scalingMethod,
    });

    dispatch({ type: ActionType.ScaleDataSuccess });

    fetchData();
  };

  return (
    <React.Fragment>
      <FormControl sx={{ minWidth: '14em' }}>
        <InputLabel id='select-scaling-method-label'>Scaling Method</InputLabel>
        <Select
          labelId='select-scaling-method-label'
          id='select-scaling-method'
          value={state.scalingMethod}
          label='Scaling Method'
          onChange={handleMethodChange}>
          {ScalingMethods.map(method => (
            <MenuItem key={method.id} value={method.type}>
              <Stack direction='row' gap={1}>
                <ScaleMethodTooltip title={method.tooltip} placement='right'>
                  <InfoIcon sx={{ color: 'grey.500' }} />
                </ScaleMethodTooltip>
                {method.display}
              </Stack>
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        disabled={state.scalingMethod === 'none' || state.dataFrame.totalRows === 0}
        variant='contained'
        size='small'
        onClick={doubleCheckSwitch.on}
        startIcon={<AlignVerticalBottomIcon />}>
        Scale
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Scale',
          execute: handleScale,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' scale '}
        </Box>
        the dataframe.
        <br />
        Are you sure?
      </DoubleCheck>
    </React.Fragment>
  );
};
