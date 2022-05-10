import React from 'react';

import { FormGroup, FormControlLabel, Checkbox as MuiCheckbox } from '@mui/material';

interface Props {
  checked: boolean;
  label: string;
  onChange: () => void;
}

export const Checkbox: React.FC<Props> = ({ checked, label, onChange }) => {
  return (
    <FormGroup>
      <FormControlLabel control={<MuiCheckbox checked={checked} onChange={onChange} />} label={label} />
    </FormGroup>
  );
};
