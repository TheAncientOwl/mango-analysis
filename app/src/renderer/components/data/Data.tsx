import { Box, Stack, Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { dataReducer } from './Data.reducer';
import { ImportButtton } from './ImportButton';

export const Data: React.FC = () => {
  const [state, dispatch] = React.useReducer(dataReducer, {
    fetching: false,
  });

  const { fetching } = state;

  return (
    <>
      <Stack direction='row'>
        <ImportButtton dispatch={dispatch} />
      </Stack>
      <Box sx={{ display: 'flex' }}></Box>
      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={fetching}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};
