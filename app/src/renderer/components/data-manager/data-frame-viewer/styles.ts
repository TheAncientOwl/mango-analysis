// eslint-disable-next-line import/named
import { Theme } from '@mui/material/styles';

const cellTransition = {
  transition: (theme: Theme) =>
    theme.transitions.create('background-color', {
      duration: theme.transitions.duration.shortest,
    }),
} as const;

const notCheckedStyle = {
  ...cellTransition,
} as const;

const checkedStyle = {
  ...cellTransition,
  bgcolor: 'primary.main',
  color: 'text.disabled',
} as const;

export const getCellStyle = (checked: boolean) => {
  return checked ? checkedStyle : notCheckedStyle;
};
