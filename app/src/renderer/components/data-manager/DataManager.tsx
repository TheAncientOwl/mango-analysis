import React from 'react';

import { Box, Button, Backdrop, CircularProgress, Stack, Typography } from '@mui/material';
import { ActionType, dataManagerReducer } from './dataManagerReducer';
import { axios } from '@src/renderer/config';
import { DataFrameViewer } from './data-frame-viewer';
import { Snackbar } from '@renderer/components/Snackbar';

export const DataManager: React.FC = () => {
  const [state, dispatch] = React.useReducer(dataManagerReducer, {
    loading: false,
    dataFrame: { labels: [], totalRows: 0, rows: [] },
    page: 0,
    pageSize: 25,
    checkedLabels: new Set<string>(),
    checkedRows: new Set<number>(),
    decimalsPrecision: 3,
    feedbackMessage: '',
    feedbackMessageOpen: false,
  });

  const fetchData = () => {
    dispatch({ type: ActionType.Loading });

    axios.get(`/data/page/${state.page}/page-size/${state.pageSize}`).then(res => {
      if ('dataframe' in res.data) dispatch({ type: ActionType.DataFetched, payload: res.data.dataframe });
      else dispatch({ type: ActionType.EndLoading });
    });
  };

  const importData = async () => {
    dispatch({ type: ActionType.Loading });

    const filePath = await window.electron.getImportCsvPath();

    if (filePath === null) {
      dispatch({ type: ActionType.EndLoading });
      return;
    }

    axios.get(`/data/import/csv/${filePath}`).then(() => {
      fetchData();
      dispatch({ type: ActionType.DataImported });
    });
  };

  const dropDataFrame = async () => {
    dispatch({ type: ActionType.Loading });

    axios.post('/data/drop-all').then(() => {
      dispatch({ type: ActionType.DataframeDropped });
    });
  };

  const closeFeedbackMessage = () => dispatch({ type: ActionType.CloseFeedbackMessage });

  const handle = React.useMemo(
    () => ({
      pageChange: (newPageIndex: number) => dispatch({ type: ActionType.ChangePage, payload: newPageIndex }),
      pageSizeChange: (newPageSize: number) => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize }),
      labelCheck: (selectedLabel: string) => dispatch({ type: ActionType.CheckLabel, payload: selectedLabel }),
      rowCheck: (selectedRow: number) => dispatch({ type: ActionType.CheckRow, payload: selectedRow }),
    }),
    [dispatch]
  );

  React.useEffect(() => {
    fetchData();
  }, [state.page, state.pageSize]);

  return (
    <>
      <Stack sx={{ p: 2, gap: 1 }} direction='row'>
        <Button onClick={importData} variant='contained' size='medium' disableElevation>
          Import
        </Button>
        <Button onClick={dropDataFrame} variant='contained' size='medium' disableElevation>
          Delete
        </Button>
      </Stack>

      {state.dataFrame.totalRows === 0 && (
        <Typography
          sx={{
            height: '100%',
            p: 2,
            pt: '5%',
            display: 'flex',
            justifyContent: 'center',
          }}>
          No data loaded...
        </Typography>
      )}
      {state.dataFrame.totalRows > 0 && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            boxSizing: 'border-box',
            p: 1.5,
            pt: 0,
          }}>
          <DataFrameViewer
            dataFrame={state.dataFrame}
            page={state.page}
            pageSize={state.pageSize}
            decimalsPrecision={state.decimalsPrecision}
            checkedLabels={state.checkedLabels}
            checkedRows={state.checkedRows}
            onLabelCheck={handle.labelCheck}
            onRowCheck={handle.rowCheck}
            onPageChange={handle.pageChange}
            onPageSizeChange={handle.pageSizeChange}
          />
        </Box>
      )}

      <Snackbar open={state.feedbackMessageOpen} onClose={closeFeedbackMessage}>
        {state.feedbackMessage}
      </Snackbar>

      <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={state.loading}>
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};
