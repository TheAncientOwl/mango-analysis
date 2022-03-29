import React from 'react';

import { CacheSystem } from '@src/renderer/api/CacheSystem';

import { DataFrame, DecimalsPrecision } from './data-frame-viewer/types';

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';
export const DataframeDecimalsKey = 'dataframe-decimals';

export enum ActionType {
  BeginLoading = 'BEGIN_LOADING',
  FetchDataCancel = 'FETCH_DATA_CANCEL',
  FetchDataSuccess = 'FETCH_DATA_SUCCESS',
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  ChangePageIndex = 'CHANGE_PAGE_INDEX',
  SelectColumn = 'SELECT_COLUMN',
  SelectRow = 'SELECT_ROW',
  DropDataSuccess = 'DROP_DATA_SUCCESS',
  ChangeScalingMethod = 'CHANGE_SCALING_METHOD',
  ScaleDataSuccess = 'SCALE_DATA_SUCCESS',
  ChangeDecimals = 'CHANGE_DECIMALS',
}

export type ScalingMethodType =
  | 'none'
  | 'maximum_absolute_scaling'
  | 'min_max_scaling'
  | 'z_score_scaling'
  | 'robust_scaling';

interface State {
  loadingData: boolean;
  pageIndex: number;
  pageSize: number;
  data: DataFrame;
  checkedLabels: Set<string>;
  checkedRows: Set<number>;
  scalingMethod: ScalingMethodType;
  decimalsPrecision: DecimalsPrecision;
}

export interface Action {
  type: ActionType;
  payload?: string | number | DataFrame | ScalingMethodType | DecimalsPrecision;
}

export type ViewTabDispatcher = React.Dispatch<Action>;

// !! Don't change loadingData back to false when a fetchData is coming next
// !! in order to avoid re-renders of the dataframe.
export const viewTabReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.BeginLoading: {
      if (state.loadingData === true) return state;

      return {
        ...state,
        loadingData: true,
      };
    }

    case ActionType.FetchDataCancel: {
      return {
        ...state,
        loadingData: false,
      };
    }

    case ActionType.FetchDataSuccess: {
      return {
        ...state,
        loadingData: false,
        data: action.payload as DataFrame,
      };
    }

    case ActionType.ChangePageSize: {
      CacheSystem.SetItem(DataPageSizeKey, action.payload);

      return {
        ...state,
        pageIndex: 0,
        pageSize: action.payload as number,
      };
    }

    case ActionType.ChangePageIndex: {
      CacheSystem.SetItem(DataPageIndexKey, action.payload);

      return {
        ...state,
        pageIndex: action.payload as number,
      };
    }

    case ActionType.SelectColumn: {
      const newSet = new Set(state.checkedLabels);
      const selectedColumn = action.payload as string;

      if (newSet.has(selectedColumn)) newSet.delete(selectedColumn);
      else newSet.add(selectedColumn);

      return {
        ...state,
        checkedLabels: newSet,
      };
    }

    case ActionType.SelectRow: {
      const newSet = new Set(state.checkedRows);
      const selectedRow = action.payload as number;

      if (newSet.has(selectedRow)) newSet.delete(selectedRow);
      else newSet.add(selectedRow);

      return {
        ...state,
        checkedRows: newSet,
      };
    }

    case ActionType.DropDataSuccess: {
      return {
        ...state,
        pageIndex: 0,
        checkedLabels: new Set<string>(),
        checkedRows: new Set<number>(),
      };
    }

    case ActionType.ChangeScalingMethod: {
      return {
        ...state,
        scalingMethod: action.payload as ScalingMethodType,
      };
    }

    case ActionType.ScaleDataSuccess: {
      return {
        ...state,
        scalingMethod: 'none',
      };
    }

    case ActionType.ChangeDecimals: {
      CacheSystem.SetItem(DataframeDecimalsKey, action.payload);

      return {
        ...state,
        decimalsPrecision: action.payload as DecimalsPrecision,
      };
    }
  }
};
