import React from 'react';

import { TextField, Stack, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { Tooltip } from '@components/Tooltip';

interface Props {
  minWidth?: string;
  maxWidth?: string;
  text: string | number;
  color?: 'error' | 'warning' | 'primary' | 'secondary' | 'info' | 'success';
  placeholder: string;
  tooltip: string;
  tooltipUnsaved: string;
  onSave: (value: string | number) => void;
  type?: 'text' | 'number';
}

const editIcon = <EditIcon />;

export const InputSave: React.FC<Props> = ({
  text,
  placeholder,
  onSave,
  tooltip,
  color = 'primary',
  tooltipUnsaved,
  minWidth = 'auto',
  maxWidth = 'auto',
  type = 'text',
}) => {
  const [value, setValue] = React.useState(text);

  const notSaved = text !== value;

  return (
    <Stack direction='row' gap={1}>
      <Box minWidth={minWidth} maxWidth={maxWidth}>
        <TextField
          color={notSaved ? 'warning' : color}
          size='small'
          fullWidth
          type={type}
          label={placeholder}
          variant='outlined'
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
        />
      </Box>
      <Tooltip title={notSaved ? tooltipUnsaved : tooltip}>
        <IconButton onClick={() => onSave(value)} color={notSaved ? 'warning' : 'inherit'}>
          {editIcon}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
