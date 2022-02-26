import React from 'react';

import { Box } from '@mui/system';
// eslint-disable-next-line import/named
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { SuccessSnack } from '@renderer/components/SuccessSnack';
import { axios } from '@src/renderer/config';
import { useSwitch } from '@src/renderer/hooks';

import { ActionType, ScalingMethodType, ViewTabDispatcher } from './viewTabStateReducer';
import { DataFetcher } from './ViewTab';

interface Props {
  scalingMethod: ScalingMethodType;
  dispatch: ViewTabDispatcher;
  fetchData: DataFetcher;
}

interface ScalingMethodConfig {
  id: number;
  display: string;
  type: ScalingMethodType;
}

const ScalingMethods: ReadonlyArray<ScalingMethodConfig> = [
  {
    id: 0,
    display: 'none',
    type: 'none',
  },
  {
    id: 1,
    display: 'maximum-absolute',
    type: 'maximum_absolute_scaling',
  },
  {
    id: 2,
    display: 'min-max',
    type: 'min_max_scaling',
  },
  {
    id: 3,
    display: 'robust',
    type: 'robust_scaling',
  },
  {
    id: 4,
    display: 'z-score',
    type: 'z_score_scaling',
  },
];

export const ScalingHandler: React.FC<Props> = ({ scalingMethod, dispatch, fetchData }) => {
  const [doubleCheckSwitch, toggleDoubleCheckSwitch] = useSwitch();
  const [snackSwitch, toggleSnack] = useSwitch();

  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: ActionType.ChangeScalingMethod, payload: event.target.value as ScalingMethodType });
  };

  const handleScale = () => {
    toggleDoubleCheckSwitch();
    dispatch({ type: ActionType.ScaleData });

    axios
      .post('/data/scale', {
        method: scalingMethod,
      })
      .then(() => {
        dispatch({ type: ActionType.ScaleDataSuccess });
        fetchData();
        toggleSnack();
      });
  };

  return (
    <React.Fragment>
      <FormControl sx={{ minWidth: '12em' }}>
        <InputLabel id='select-scaling-method-label'>Scaling Method</InputLabel>
        <Select
          labelId='select-scaling-method-label'
          id='select-scaling-method'
          value={scalingMethod}
          label='Scaling Method'
          onChange={handleChange}>
          {ScalingMethods.map(method => (
            <MenuItem key={method.id} value={method.type}>
              {method.display}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        disabled={scalingMethod === 'none'}
        variant='contained'
        size='small'
        onClick={toggleDoubleCheckSwitch}
        startIcon={<LinearScaleIcon />}>
        Scale
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch}
        onAccept={{
          title: 'Scale',
          execute: handleScale,
        }}
        onReject={{
          title: 'Cancel',
          execute: toggleDoubleCheckSwitch,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' scale '}
        </Box>
        the dataframe.
        <br />
        Are you sure?
      </DoubleCheck>

      <SuccessSnack open={snackSwitch} onClose={toggleSnack}>
        Scaled data!
      </SuccessSnack>
    </React.Fragment>
  );
};
