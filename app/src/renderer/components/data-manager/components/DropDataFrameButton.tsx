import React from 'react';

import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DoubleCheck } from '@renderer/components/DoubleCheck';

import { axios } from '@renderer/config';
import { useSwitch } from '@renderer/hooks';

import { ActionType } from '../state';
import { DataManagerContext } from '../context';

export const DropDataFrameButton: React.FC = () => {
  const { dispatch, state } = React.useContext(DataManagerContext);
  const doubleCheckSwitch = useSwitch();

  const dropDataFrame = async () => {
    doubleCheckSwitch.off();

    dispatch({ type: ActionType.Loading });

    await axios.post('/data/drop-all');

    dispatch({ type: ActionType.DataframeDropped });
  };

  return (
    <>
      <Button
        disabled={state.dataFrame.totalRows === 0}
        onClick={doubleCheckSwitch.on}
        startIcon={<DeleteIcon />}
        variant='contained'
        size='medium'
        disableElevation>
        Delete
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Delete',
          execute: dropDataFrame,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' delete the Dataframe'}
        </Box>
        <br />
        Are you sure?
      </DoubleCheck>
    </>
  );
};
