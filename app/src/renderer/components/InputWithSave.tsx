import React from 'react';

import { TextField, Stack, IconButton, Box } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';

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

const saveIcon = <SaveIcon />;

export const InputWithSave: React.FC<Props> = ({
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
          {saveIcon}
        </IconButton>
      </Tooltip>
    </Stack>
  );
};
