import React from 'react';

import { Box, Checkbox } from '@mui/material';

interface Props {
  checked: boolean;
  value: number | string;
  onSelect: (value: number | string) => void;
}

export const CheckBox: React.FC<Props> = ({ checked, value, onSelect }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Checkbox
        color='secondary'
        inputProps={{ 'aria-label': 'checkbox-cell' }}
        onChange={() => onSelect(value)}
        checked={checked}
      />
      {value}
    </Box>
  );
};
