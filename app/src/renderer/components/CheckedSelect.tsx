import React from 'react';

import {
  Box,
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  // eslint-disable-next-line import/named
  SelectChangeEvent,
  Stack,
} from '@mui/material';

import { CheckedButton } from '@components/buttons';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      minWidth: 350,
    },
  },
};

interface Props {
  maxWidth?: string;
  minWidth?: string;
  id: string;
  label: string;
  allChecked: boolean;
  onCheckAll: () => void;
  checkedValues: string[];
  possibleValues: string[];
  onChange: (event: SelectChangeEvent<string[]>) => void;
}

export const CheckedSelect: React.FC<Props> = ({
  minWidth = 'auto',
  maxWidth = 'auto',
  id,
  label,
  allChecked,
  onCheckAll,
  checkedValues,
  possibleValues,
  onChange,
}) => {
  return (
    <Stack direction='row' gap={2}>
      <CheckedButton checked={allChecked} onClick={onCheckAll}>
        all
      </CheckedButton>

      <Box minWidth={minWidth} maxWidth={maxWidth}>
        <FormControl fullWidth>
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            id={`${id}`}
            multiple
            value={checkedValues}
            label={`Display ${label}`}
            onChange={onChange}
            input={<OutlinedInput label='Tag' />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}>
            {possibleValues.map(value => (
              <MenuItem key={value} value={value}>
                <Checkbox checked={checkedValues.indexOf(value) > -1} />
                <ListItemText primary={value} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Stack>
  );
};
