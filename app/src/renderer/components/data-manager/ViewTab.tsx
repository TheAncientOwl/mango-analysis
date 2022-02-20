import React from 'react';

import { Typography } from '@mui/material';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DataFrame, DataConfig } from '@renderer/components/DataFrame';

import { axios } from '@renderer/config';
import { ImportPathKey } from './ImportTab';

interface State {
  pageIndex: number;
  pageSize: number;
  data: DataConfig;
  loadingData: boolean;
}

enum ActionType {
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  ChangePageIndex = 'CHANGE_PAGE_INDEX',
  RequestDataSuccess = 'REQUEST_DATA_SUCCESS',
}

interface Action {
  type: ActionType;
  payload: number | DataConfig;
}

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.ChangePageIndex: {
      CacheSystem.SetItem(DataPageIndexKey, action.payload);

      return {
        ...state,
        pageIndex: action.payload as number,
        loadingData: true,
      };
    }
    case ActionType.ChangePageSize: {
      CacheSystem.SetItem(DataPageSizeKey, action.payload);

      return {
        ...state,
        pageIndex: 0,
        pageSize: action.payload as number,
        loadingData: true,
      };
    }
    case ActionType.RequestDataSuccess: {
      return {
        ...state,
        data: action.payload as DataConfig,
        loadingData: false,
      };
    }
  }
};

export const ViewTab: React.FC = () => {
  const [{ pageIndex, pageSize, data, loadingData }, dispatch] = React.useReducer(reducer, {
    pageIndex: CacheSystem.GetItemOrDefault<number>(DataPageIndexKey, 0),
    pageSize: CacheSystem.GetItemOrDefault<number>(DataPageSizeKey, 25),
    loadingData: true,
    data: { columns: [], rows: [], totalRows: 0 },
  });

  if (!CacheSystem.GetItem(ImportPathKey)) return <Typography>No data loaded...</Typography>;

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
  }, [pageIndex, pageSize]);

  return (
    <DataFrame
      loading={loadingData}
      currentData={data}
      currentPage={pageIndex}
      rowsPerPage={pageSize}
      onPageChange={newPageIndex => dispatch({ type: ActionType.ChangePageIndex, payload: newPageIndex })}
      onPageSizeChange={newPageSize => dispatch({ type: ActionType.ChangePageSize, payload: newPageSize })}
    />
  );
};
