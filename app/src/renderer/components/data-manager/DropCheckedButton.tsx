import { Box, Button } from '@mui/material';
import { axios } from '@renderer/config';
import React from 'react';
import { DataManagerContext } from './DataManagerContext';
import { ActionType } from './dataManagerReducer';
import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { useSwitch } from '@renderer/hooks';

import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';

export const DropCheckedButton: React.FC = () => {
  const { dispatch, state, fetchData } = React.useContext(DataManagerContext);
  const doubleCheckSwitch = useSwitch();

  const dropChecked = async () => {
    doubleCheckSwitch.off();

    dispatch({ type: ActionType.Loading });

    await axios.post('/data/drop/rows+cols', {
      labels: Array.from(state.checkedLabels),
      mangoIDs: Array.from(state.checkedRows),
    });

    dispatch({ type: ActionType.DropDataSuccess });

    fetchData();
  };

  return (
    <>
      <Button
        startIcon={<PlaylistRemoveIcon />}
        disabled={state.loading || (state.checkedLabels.size === 0 && state.checkedRows.size === 0)}
        onClick={doubleCheckSwitch.on}
        variant='contained'
        size='medium'
        disableElevation>
        Drop
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Drop',
          execute: dropChecked,
        }}
        onReject={{
          title: 'Cancel',
          execute: doubleCheckSwitch.off,
        }}>
        This action will
        <Box component='span' sx={{ color: 'error.main' }}>
          {' drop all checked '}
        </Box>
        rows and columns
        <br />
        Are you sure?
      </DoubleCheck>
    </>
  );
};
