import { yellow, green, teal, lightBlue } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
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
});
