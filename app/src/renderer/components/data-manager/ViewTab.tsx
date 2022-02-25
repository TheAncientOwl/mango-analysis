import React from 'react';

import { Button, Box, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { DataFrame } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';

import { viewTabReducer, DataPageIndexKey, DataPageSizeKey, ActionType } from './viewTabStateReducer';
import { useSnackbar, useSwitch } from '@src/renderer/hooks';

export const ViewTab: React.FC = () => {
  const [state, dispatch] = React.useReducer(viewTabReducer, {
    pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
    pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
    loadingData: true,
    selectedLabels: new Set<string>(),
    selectedRows: new Set<number>(),
    data: { labels: [], totalRows: 0, rows: [] },
  });
  const { pageIndex, pageSize, data, loadingData, selectedLabels, selectedRows } = state;
  const [doubleCheckSwitch, toggleDoubleCheckSwitch] = useSwitch();
  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Rows & columns dropped',
    severity: 'success',
    variant: 'filled',
  });

  // >> Fetch data.
  const fetchData = () => {
    let active = true;

    axios.get(`/data/page/${pageIndex}/page-size/${pageSize}`).then(res => {
      if (!active) return;

      if ('dataframe' in res.data) dispatch({ type: ActionType.RequestDataSuccess, payload: res.data.dataframe });
    });

    return () => {
      active = false;
    };
  };
  React.useEffect(fetchData, [pageIndex, pageSize]);

  // >> Handle drop rows & columns
  const handleDrop = () => {
    toggleDoubleCheckSwitch();
    dispatch({ type: ActionType.RequestDropData });

    axios
      .post('/data/drop/rows+cols', {
        labels: Array.from(selectedLabels),
        mangoIDs: Array.from(selectedRows),
      })
      .then(() => {
        dispatch({ type: ActionType.DropDataSuccess });
        fetchData();
        snackbar.open();
      });
  };

  // >> Return JSX.
  return (
    <React.Fragment>
      {data.totalRows === 0 ? (
        <Typography>No data loaded...</Typography>
      ) : (
        <Stack sx={{ p: 1.4, pt: 0 }} direction='row' spacing={2}>
          <Button
            disabled={loadingData || (selectedLabels.size == 0 && selectedRows.size == 0)}
            variant='contained'
            size='small'
            onClick={toggleDoubleCheckSwitch}
            startIcon={<DeleteIcon />}>
            Drop
          </Button>
        </Stack>
      )}

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

      <DataFrame
        loading={loadingData}
        currentData={data}
        currentPage={pageIndex}
        rowsPerPage={pageSize}
        onPageChange={newPageIndex => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex })}
        onPageSizeChange={newPageSize => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize })}
        selectable={true}
        onLabelSelect={selectedLabel => dispatch({ type: ActionType.SelectColumn, payload: selectedLabel })}
        onRowSelect={selectedRow => dispatch({ type: ActionType.SelectRow, payload: selectedRow })}
        selectedLabels={selectedLabels}
        selectedRows={selectedRows}
      />
    </React.Fragment>
  );
};
