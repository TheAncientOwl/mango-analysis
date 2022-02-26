import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CacheSystem } from '@renderer/api/CacheSystem';

import { DataFrame } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';

import { viewTabReducer, DataPageIndexKey, DataPageSizeKey, ActionType } from './viewTabStateReducer';
import { ScalingHandler } from './ScalingHandler';
import { DropHandler } from './DropHandler';
import { DecimalsHandler } from './DecimalsHandler';

export type DataFetcher = () => void;

const VerticalLine = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export const ViewTab: React.FC = () => {
  const [state, dispatch] = React.useReducer(viewTabReducer, {
    pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
    pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
    loadingData: true,
    selectedLabels: new Set<string>(),
    selectedRows: new Set<number>(),
    data: { labels: [], totalRows: 0, rows: [] },
    scalingMethod: 'none',
    decimals: 'default',
  });
  const { pageIndex, pageSize, data, loadingData, selectedLabels, selectedRows, scalingMethod, decimals } = state;

  // >> Fetch data.
  // ! before calling this func, you should dispatch a FetchData action
  // ! or at least the loadingData should be set to true.
  const fetchData: DataFetcher = () => {
    let active = true;

    axios.get(`/data/page/${pageIndex}/page-size/${pageSize}`).then(res => {
      if (!active) return;

      if ('dataframe' in res.data) dispatch({ type: ActionType.FetchDataSuccess, payload: res.data.dataframe });
    });

    return () => {
      dispatch({ type: ActionType.FetchDataCancel });
      active = false;
    };
  };
  React.useEffect(fetchData, [pageIndex, pageSize]);

  if (data.totalRows === 0 && !loadingData) return <Typography>No data loaded...</Typography>;

  const handle = React.useMemo(
    () => ({
      pageChange: (newPageIndex: number) => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex }),
      pageSizeChange: (newPageSize: number) => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize }),
      labelSelect: (selectedLabel: string) => dispatch({ type: ActionType.SelectColumn, payload: selectedLabel }),
      rowSelect: (selectedRow: number) => dispatch({ type: ActionType.SelectRow, payload: selectedRow }),
    }),
    [dispatch]
  );

  // >> Return JSX.
  return (
    <React.Fragment>
      <Stack sx={{ p: 1.4, pt: 0 }} direction='row' spacing={2}>
        <ScalingHandler scalingMethod={scalingMethod} dispatch={dispatch} fetchData={fetchData} />
        {VerticalLine}
        <DropHandler
          loadingData={loadingData}
          dispatch={dispatch}
          fetchData={fetchData}
          labels={Array.from(selectedLabels)}
          mangoIDs={Array.from(selectedRows)}
        />
        {VerticalLine}
        <DecimalsHandler value={decimals} dispatch={dispatch} />
      </Stack>

      <DataFrame
        loading={loadingData}
        currentData={data}
        currentPage={pageIndex}
        rowsPerPage={pageSize}
        decimals={decimals}
        onPageChange={handle.pageChange}
        onPageSizeChange={handle.pageSizeChange}
        selectable={true}
        onLabelSelect={handle.labelSelect}
        onRowSelect={handle.rowSelect}
        selectedLabels={selectedLabels}
        selectedRows={selectedRows}
      />
    </React.Fragment>
  );
};
