import React from 'react';

import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { Snackbar } from '@src/renderer/components/Snackbar';
import { axios } from '@src/renderer/config';
import { useSwitch } from '@src/renderer/hooks';

import { ActionType, ViewTabDispatcher } from './viewTabStateReducer';
import { DataFetcher } from './ViewTab';

interface Props {
  loadingData: boolean;
  dispatch: ViewTabDispatcher;
  fetchData: DataFetcher;
  labels: Array<string>;
  mangoIDs: Array<number>;
}

export const DropHandler: React.FC<Props> = ({ loadingData, dispatch, fetchData, labels, mangoIDs }) => {
  const doubleCheckSwitch = useSwitch();
  const snackSwitch = useSwitch();

  const handleDrop = () => {
    doubleCheckSwitch.off();
    dispatch({ type: ActionType.BeginLoading });

    axios
      .post('/data/drop/rows+cols', {
        labels,
        mangoIDs,
      })
      .then(() => {
        dispatch({ type: ActionType.DropDataSuccess });
        fetchData();
        snackSwitch.on();
      });
  };

  return (
    <React.Fragment>
      <Button
        disabled={loadingData || (labels.length === 0 && mangoIDs.length === 0)}
        variant='contained'
        size='small'
        onClick={doubleCheckSwitch.on}
        startIcon={<DeleteIcon />}>
        Drop
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Drop',
          execute: handleDrop,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' drop '}
        </Box>
        selected rows and columns.
        <br />
        Are you sure?
      </DoubleCheck>

      <Snackbar open={snackSwitch.value} onClose={snackSwitch.off}>
        Rows & columns dropped
      </Snackbar>
    </React.Fragment>
  );
};
