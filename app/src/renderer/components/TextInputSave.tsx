import React from 'react';

import { TextField, Stack, IconButton, Tooltip, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  minWidth?: string;
  maxWidth?: string;
  text: string;
  placeholder: string;
  tooltip: string;
  onSave: (value: string) => void;
}

const editIcon = <EditIcon />;

export const TextInputSave: React.FC<Props> = ({
  text,
  placeholder,
  onSave,
  tooltip,
  minWidth = 'auto',
  maxWidth = 'auto',
}) => {
  const [value, setValue] = React.useState(text);

  return (
    <Stack direction='row' gap={1}>
      <Box minWidth={minWidth} maxWidth={maxWidth}>
        <TextField
          size='small'
          fullWidth
          label={placeholder}
          variant='outlined'
          onChange={e => setValue(e.target.value)}
          value={value}
          placeholder={placeholder}
        />
      </Box>
      <Tooltip title={tooltip}>
        <IconButton onClick={() => onSave(value)}>{editIcon}</IconButton>
      </Tooltip>
    </Stack>
  );
};
