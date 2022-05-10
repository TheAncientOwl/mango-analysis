import React from 'react';

// eslint-disable-next-line import/named
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changeDecimalsPrecision } from '@store/data-manager/actions';

import { DecimalsOptions } from './DecimalsOptions.config';
import { DecimalsPrecision } from '../data-frame-viewer/types';

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

// <redux>
const mapState = (state: RootState) => ({
  decimalsPrecision: state.dataManager.decimalsPrecision,
});

const mapDispatch = {
  changeDecimalsPrecision,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DecimalsHandler);
// </redux>
