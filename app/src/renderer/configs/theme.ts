import { green, yellow } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: green[900],
    },
    secondary: {
      main: yellow[700],
    },
  },
});
