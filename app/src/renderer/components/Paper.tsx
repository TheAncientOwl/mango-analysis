import { Paper as MuiPaper } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Paper = styled(MuiPaper)(({ theme }) => ({
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,

  padding: theme.spacing(1),
  margin: theme.spacing(1),

  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
}));
