import React from 'react';

import { Box, Button, Checkbox, Stack, Autocomplete, TextField } from '@mui/material';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

interface Props {
  maxWidth?: string;
  minWidth?: string;
  id: string;
  label: string;
  allChecked: boolean;
  checkedValues: string[];
  onCheckAll: () => void;
  possibleValues: string[];
  onChange: (values: string[]) => void;
}

export const AutoCompleteCheckedSelect: React.FC<Props> = ({
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
    <Stack direction={checkedValues.length > 15 ? 'column' : 'row'} gap={2}>
      <Button size='medium' startIcon={allChecked ? checkedIcon : icon} onClick={onCheckAll}>
        all targets
      </Button>

      {!allChecked && (
        <Box maxWidth={maxWidth} minWidth={minWidth}>
          <Autocomplete
            fullWidth
            multiple
            id={id}
            options={possibleValues}
            disableCloseOnSelect
            getOptionLabel={option => option}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option}
              </li>
            )}
            onChange={(e, value) => onChange(value)}
            renderInput={params => <TextField {...params} label={label} placeholder={label} />}
          />
        </Box>
      )}
    </Stack>
  );
};
