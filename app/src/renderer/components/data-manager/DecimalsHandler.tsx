import React from 'react';

import { DecimalsPrecision } from './data-frame-viewer/types';
// eslint-disable-next-line import/named
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ActionType, ViewTabDispatcher } from './viewTabStateReducer';

interface Props {
  value: DecimalsPrecision;
  dispatch: ViewTabDispatcher;
}

interface DecimalsOptionConfig {
  id: number;
  display: string;
  value: DecimalsPrecision;
}

const DecimalsOptions: ReadonlyArray<DecimalsOptionConfig> = [
  {
    id: 0,
    display: 'default',
    value: 'default',
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

export const DecimalsHandler: React.FC<Props> = ({ value, dispatch }) => {
  const handleChange = (event: SelectChangeEvent) => {
    dispatch({ type: ActionType.ChangeDecimals, payload: event.target.value as DecimalsPrecision });
  };

  return (
    <FormControl sx={{ minWidth: '6.5em' }}>
      <InputLabel id='select-decimals-label'>Decimals</InputLabel>
      <Select
        labelId='select-decimals-label'
        id='select-decimals'
        value={value as string}
        label='Display Decimals'
        onChange={handleChange}>
        {DecimalsOptions.map(option => (
          <MenuItem key={option.id} value={option.value}>
            {option.display}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
