import React from 'react';

// eslint-disable-next-line import/named
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { DecimalsPrecision } from '../data-frame-viewer/types';

import { changeDecimalsPrecision } from '@renderer/state/actions/data-manager/actions';

interface DecimalsOptionConfig {
  id: number;
  display: string;
  value: DecimalsPrecision;
}

const DecimalsOptions: ReadonlyArray<DecimalsOptionConfig> = [
  {
    id: 0,
    display: 'all',
    value: 'all',
  },
  ...new Array(7).fill(0).map((item, index) => {
    const value = index + 1;

    return {
      id: value as number,
      display: value.toString(),
      value: value as DecimalsPrecision,
    } as DecimalsOptionConfig;
  }),
];

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/state/store';

const mapState = (state: RootState) => ({
  decimalsPrecision: state.dataManager.decimalsPrecision,
});

const mapDispatch = {
  changeDecimalsPrecision,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DecimalsHandler: React.FC<PropsFromRedux> = props => {
  const handleValueChange = (event: SelectChangeEvent) => {
    props.changeDecimalsPrecision(event.target.value as DecimalsPrecision);
  };

  return (
    <FormControl sx={{ minWidth: '5em' }}>
      <InputLabel id='select-decimals-label'>Decimals</InputLabel>
      <Select
        labelId='select-decimals-label'
        id='select-decimals'
        value={props.decimalsPrecision as string}
        label='Display Decimals'
        onChange={handleValueChange}>
        {DecimalsOptions.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default connector(DecimalsHandler);
