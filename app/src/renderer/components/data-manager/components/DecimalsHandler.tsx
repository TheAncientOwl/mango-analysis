import React from 'react';

// eslint-disable-next-line import/named
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

import { DecimalsPrecision } from '../data-frame-viewer/types';

import { ActionType } from '../state';
import { DataManagerContext } from '../context';

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
  ...new Array(5).fill(0).map((item, index) => {
    const value = index + 1;

    return {
      id: value as number,
      display: value.toString(),
      value: value as DecimalsPrecision,
    } as DecimalsOptionConfig;
  }),
];

export const DecimalsHandler: React.FC = () => {
  const { dispatch, state } = React.useContext(DataManagerContext);

  const handleValueChange = (event: SelectChangeEvent) => {
    dispatch({ type: ActionType.ChangeDecimals, payload: event.target.value as DecimalsPrecision });
  };

  return (
    <FormControl sx={{ minWidth: '5em' }}>
      <InputLabel id='select-decimals-label'>Decimals</InputLabel>
      <Select
        labelId='select-decimals-label'
        id='select-decimals'
        value={state.decimalsPrecision as string}
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
