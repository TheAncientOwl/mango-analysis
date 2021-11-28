import { amber, green } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[800],
    },
    secondary: {
      main: amber[300],
    },
  },
});
