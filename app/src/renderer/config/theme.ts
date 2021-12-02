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
      xs: 700,
      sm: 1366,
      md: 1440,
      lg: 1926,
      xl: 2560,
      xxl: 3840,
    },
  },
});

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xxl: true;
  }
}
