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
} as const;

export const getCellStyle = (checked: boolean) => {
  return checked ? checkedStyle : notCheckedStyle;
};

export const noDataLoadedMessageStyles = {
  height: '100%',
  p: 2,
  pt: '5%',
  display: 'flex',
  justifyContent: 'center',
} as const;

export const dataFrameWrapperStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  boxSizing: 'border-box',
  p: 1.5,
  pt: 0,
} as const;
