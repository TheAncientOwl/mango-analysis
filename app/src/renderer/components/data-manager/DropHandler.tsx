import React from 'react';

import { Box } from '@mui/system';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { axios } from '@src/renderer/config';
import { useSnackbar, useSwitch } from '@src/renderer/hooks';

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
  const [doubleCheckSwitch, toggleDoubleCheckSwitch] = useSwitch();
  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Rows & columns dropped',
    severity: 'success',
    variant: 'filled',
  });

  const handleDrop = () => {
    toggleDoubleCheckSwitch();
    dispatch({ type: ActionType.DropData });

    axios
      .post('/data/drop/rows+cols', {
        labels,
        mangoIDs,
      })
      .then(() => {
        dispatch({ type: ActionType.DropDataSuccess });
        fetchData();
        snackbar.open();
      });
  };

  return (
    <React.Fragment>
      <Button
        disabled={loadingData || (labels.length === 0 && mangoIDs.length === 0)}
        variant='contained'
        size='small'
        onClick={toggleDoubleCheckSwitch}
        startIcon={<DeleteIcon />}>
        Drop
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch}
        title='Double check'
        text={
          <React.Fragment>
            This action will{' '}
            <Box component='span' sx={{ color: 'error.main' }}>
              drop
            </Box>{' '}
            selected rows and columns.
            <br />
            Are you sure?
          </React.Fragment>
        }
        onAccept={{
          title: 'Drop',
          execute: handleDrop,
          buttonColor: 'error',
        }}
        onReject={{
          title: 'Cancel',
          execute: toggleDoubleCheckSwitch,
          buttonColor: 'info',
        }}
      />

      {snackbar.element}
    </React.Fragment>
  );
};
