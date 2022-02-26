import React from 'react';

import { Data } from '@renderer/components/DataFrame';
import { CacheSystem } from '@src/renderer/api/CacheSystem';

export const DataPageIndexKey = 'data-page-index';
export const DataPageSizeKey = 'data-page-size';

export enum ActionType {
  FetchData = 'FETCH_DATA',
  FetchDataCancel = 'FETCH_DATA_CANCEL',
  FetchDataSuccess = 'FETCH_DATA_SUCCESS',
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  ChangePageIndex = 'CHANGE_PAGE_INDEX',
  SelectColumn = 'SELECT_COLUMN',
  SelectRow = 'SELECT_ROW',
  DropData = 'DROP_DATA',
  DropDataSuccess = 'DROP_DATA_SUCCESS',
  ChangeScalingMethod = 'CHANGE_SCALING_METHOD',
  ScaleData = 'SCALE_DATA',
  ScaleDataSuccess = 'SCALE_DATA_SUCCESS',
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
  data: Data;
  selectedLabels: Set<string>;
  selectedRows: Set<number>;
  scalingMethod: ScalingMethodType;
}

export interface Action {
  type: ActionType;
  payload?: string | number | Data | ScalingMethodType;
}

export type ViewTabDispatcher = React.Dispatch<Action>;

export const viewTabReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.FetchData: {
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
        data: action.payload as Data,
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
      const newSet = new Set(state.selectedLabels);
      const selectedColumn = action.payload as string;

      if (newSet.has(selectedColumn)) newSet.delete(selectedColumn);
      else newSet.add(selectedColumn);

      return {
        ...state,
        selectedLabels: newSet,
      };
    }

    case ActionType.SelectRow: {
      const newSet = new Set(state.selectedRows);
      const selectedRow = action.payload as number;

      if (newSet.has(selectedRow)) newSet.delete(selectedRow);
      else newSet.add(selectedRow);

      return {
        ...state,
        selectedRows: newSet,
      };
    }

    case ActionType.DropData: {
      return {
        ...state,
        loadingData: true,
      };
    }

    case ActionType.DropDataSuccess: {
      return {
        ...state,
        loadingData: false,
        pageIndex: 0,
        selectedLabels: new Set<string>(),
        selectedRows: new Set<number>(),
      };
    }

    case ActionType.ChangeScalingMethod: {
      return {
        ...state,
        scalingMethod: action.payload as ScalingMethodType,
      };
    }

    case ActionType.ScaleData: {
      return {
        ...state,
        loadingData: true,
      };
    }

    case ActionType.ScaleDataSuccess: {
      return {
        ...state,
        loadingData: false,
        scalingMethod: 'none',
      };
    }
  }
};
