import React from 'react';

// eslint-disable-next-line import/named
import { InputLabel, MenuItem, FormControl, Select as MuiSelect, SelectChangeEvent, Box } from '@mui/material';

interface Props {
  maxWidth?: string;
  minWidth?: string;
  id: string;
  label: string;
  value: string | number;
  values: string[] | number[];
  onChange: (event: SelectChangeEvent) => void;
}

export const Select: React.FC<Props> = ({
  minWidth = 'auto',
  maxWidth = 'auto',
  id,
  label,
  value,
  values,
  onChange,
}) => {
  const menuItems = values.length !== 0 ? values : [value];

  return (
    <Box maxWidth={maxWidth} minWidth={minWidth}>
      <FormControl fullWidth>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <MuiSelect labelId={`${id}-label`} id={`${id}`} value={value} label={`Display ${label}`} onChange={onChange}>
          {menuItems.map((item, index) => (
            <MenuItem key={index} value={item}>
              {item}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
};
