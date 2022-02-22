import React from 'react';

import { Button, Typography, Box } from '@mui/material';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DoubleCheck } from '@renderer/components/DoubleCheck';
import { DataFrame } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';
import { ImportPathKey } from './ImportTab';

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
    dropping: false,
  });
  const { pageIndex, pageSize, data, loadingData, selectedLabels, selectedRows, dropping } = state;
  const [doubleCheckSwitch, toggleDoubleCheckSwitch] = useSwitch();
  const snackbar = useSnackbar({
    title: 'Success',
    message: 'Rows & columns dropped',
    severity: 'success',
    variant: 'filled',
  });

  // >> Return empty if no data is loaded.
  if (!CacheSystem.GetItem(ImportPathKey)) return <Typography>No data loaded...</Typography>;

  // >> Fetch data.
  React.useEffect(() => {
    let active = true;

    axios.get(`/data/page/${pageIndex}/page-size/${pageSize}`).then(res => {
      if (!active) return;

      if ('dataframe' in res.data) {
        const dataFrame = res.data.dataframe;
        dispatch({ type: ActionType.RequestDataSuccess, payload: dataFrame });
      }
    });

    return () => {
      active = false;
    };
  }, [pageIndex, pageSize, dropping]);

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
        snackbar.open();
      });
  };

  const cancelDrop = () => {
    toggleDoubleCheckSwitch();
  };

  // >> Return JSX.
  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          sx={{ mb: 1 }}
          disabled={dropping || (selectedLabels.size == 0 && selectedRows.size == 0)}
          variant='contained'
          size='small'
          onClick={toggleDoubleCheckSwitch}>
          Drop selected rows and columns
        </Button>
      </Box>

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
          execute: cancelDrop,
          buttonColor: 'info',
        }}
      />

      {snackbar.element}

      <DataFrame
        loading={loadingData || dropping}
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
