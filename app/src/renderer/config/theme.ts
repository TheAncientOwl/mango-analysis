import { yellow, green, teal, lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: green[900],
    },
    secondary: {
      main: yellow[600],
    },
    success: {
      main: teal[900],
    },
    info: {
      main: lightBlue[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 1365,
      md: 1439,
      lg: 1925,
      xl: 2559,
      xxl: 3839,
    },
  },
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}
