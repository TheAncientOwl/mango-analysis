import React from 'react';

// eslint-disable-next-line import/named
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack } from '@mui/material';
import AlignVerticalBottomIcon from '@mui/icons-material/AlignVerticalBottom';
import InfoIcon from '@mui/icons-material/Info';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState, resetAppState } from '@store/.';
import { changeScalingMethod, scaleData } from '@store/data-manager/actions';
import { ScalingMethodType } from '@store/data-manager/types';

import { DoubleCheck } from '@components/DoubleCheck';
import { useSwitch } from '@hooks/.';

import { Tooltip } from '@components/Tooltip';
import { ScalingMethods } from './ScalingMethods.config';

const ScalingHandler: React.FC<PropsFromRedux> = props => {
  const doubleCheckSwitch = useSwitch();

  const handleMethodChange = (event: SelectChangeEvent) => {
    props.changeScalingMethod(event.target.value as ScalingMethodType);
  };

  const handleScale = async () => {
    doubleCheckSwitch.off();

    props.scaleData(props.scalingMethod, props.page, props.pageSize);

    resetAppState();
  };

  return (
    <React.Fragment>
      <Stack direction='row' sx={{ gap: 1.5 }}>
        <FormControl sx={{ minWidth: '14em' }}>
          <InputLabel id='select-scaling-method-label'>Scaling Method</InputLabel>
          <Select
            labelId='select-scaling-method-label'
            id='select-scaling-method'
            value={props.scalingMethod}
            label='Scaling Method'
            onChange={handleMethodChange}>
            {ScalingMethods.map(method => (
              <MenuItem key={method.id} value={method.type}>
                <Stack direction='row' gap={1}>
                  <Tooltip title={method.tooltip} placement='right'>
                    <InfoIcon sx={{ color: 'grey.500' }} />
                  </Tooltip>
                  {method.display}
                </Stack>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          disabled={props.scalingMethod === 'none' || props.dataFrame.totalRows === 0}
          size='small'
          onClick={doubleCheckSwitch.on}
          startIcon={<AlignVerticalBottomIcon />}>
          Scale
        </Button>
      </Stack>

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

// <redux>
const mapState = (state: RootState) => ({
  dataFrame: state.dataManager.dataFrame,
  page: state.dataManager.page,
  pageSize: state.dataManager.pageSize,
  scalingMethod: state.dataManager.scalingMethod,
});

const mapDispatch = {
  changeScalingMethod,
  scaleData,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ScalingHandler);
// </redux>
