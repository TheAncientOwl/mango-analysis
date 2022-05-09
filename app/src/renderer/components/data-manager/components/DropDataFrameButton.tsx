import React from 'react';

import { useSwitch } from '@renderer/hooks';

import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { DoubleCheck } from '@renderer/components/DoubleCheck';

import { dropDataFrame } from '@renderer/state/actions/DataManagerActions';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@renderer/state/store';

const mapState = (state: RootState) => ({
  dataFrame: state.dataManager.dataFrame,
});

const mapDispatch = {
  dropDataFrame,
};

const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DropDataFrameButton: React.FC<PropsFromRedux> = props => {
  const doubleCheckSwitch = useSwitch();

  const handleDropDataFrame = () => {
    doubleCheckSwitch.off();

    props.dropDataFrame();
  };

  return (
    <>
      <Button
        disabled={props.dataFrame.totalRows === 0}
        onClick={doubleCheckSwitch.on}
        startIcon={<DeleteIcon />}
        size='medium'>
        Delete
      </Button>

      <DoubleCheck
        open={doubleCheckSwitch.value}
        onAccept={{
          title: 'Delete',
          execute: handleDropDataFrame,
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

export default connector(DropDataFrameButton);
