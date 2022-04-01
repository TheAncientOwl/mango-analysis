import React from 'react';

import { Stack, Typography } from '@mui/material';

import { CacheSystem } from '@renderer/api/CacheSystem';

import { DataFrameViewer } from './data-frame-viewer';
import { DecimalsPrecision } from './data-frame-viewer/types';

import { axios } from '@renderer/config';

import {
  viewTabReducer,
  DataPageIndexKey,
  DataPageSizeKey,
  DataframeDecimalsKey,
  ActionType,
} from './viewTabStateReducer';
import { DecimalsHandler } from './DecimalsHandler';

export type DataFetcher = () => void;

const VerticalLine = <Stack sx={{ m: 1, bgcolor: 'grey.700', p: 0.1 }}></Stack>;

export const ViewTab: React.FC = () => {
  const [state, dispatch] = React.useReducer(viewTabReducer, {
    pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
    pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
    loadingData: true,
    checkedLabels: new Set<string>(),
    checkedRows: new Set<number>(),
    data: { labels: [], totalRows: 0, rows: [] },
    scalingMethod: 'none',
    decimalsPrecision: CacheSystem.GetItemOrDefault<number>(DataframeDecimalsKey, 4) as DecimalsPrecision,
  });
  const { pageIndex, pageSize, data, checkedLabels, checkedRows, scalingMethod, decimalsPrecision } = state;

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

  // if (data.totalRows === 0 && !loadingData) return ;

  const handle = React.useMemo(
    () => ({
      pageChange: (newPageIndex: number) => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex }),
      pageSizeChange: (newPageSize: number) => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize }),
      labelSelect: (selectedLabel: string) => dispatch({ type: ActionType.SelectColumn, payload: selectedLabel }),
      rowSelect: (selectedRow: number) => dispatch({ type: ActionType.SelectRow, payload: selectedRow }),
    }),
    [dispatch]
  );

  const toolbar = (
    <Stack sx={{ p: 1.4, pt: 0 }} direction='row' spacing={2}>
      {VerticalLine}

      {VerticalLine}
    </Stack>
  );

  // >> Return JSX.
  return (
    <React.Fragment>
      {data.totalRows === 0 && (
        <Typography
          sx={{
            height: '100%',
            pt: '10%',
            textAlign: 'center',
          }}>
          No data loaded...
        </Typography>
      )}

      {data.totalRows > 0 && (
        <>
          {toolbar}
          <DataFrameViewer
            dataFrame={data}
            page={pageIndex}
            pageSize={pageSize}
            decimalsPrecision={decimalsPrecision}
            onPageChange={handle.pageChange}
            onPageSizeChange={handle.pageSizeChange}
            onLabelCheck={handle.labelSelect}
            onRowCheck={handle.rowSelect}
            checkedLabels={checkedLabels}
            checkedRows={checkedRows}
          />
        </>
      )}
    </React.Fragment>
  );
};
