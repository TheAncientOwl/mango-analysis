import React from 'react';

import { DataFrameState, DataFrame, DecimalsPrecision } from './data-frame-viewer/types';

export type ScalingMethodType =
  | 'none'
  | 'maximum_absolute_scaling'
  | 'min_max_scaling'
  | 'z_score_scaling'
  | 'robust_scaling';

export interface DataManagerState extends DataFrameState {
  loading: boolean;
  feedbackMessage: string;
  feedbackMessageOpen: boolean;
  scalingMethod: ScalingMethodType;
  pageSize: number;
  page: number;
}

export const getDefaultDataManagerState = (): DataManagerState => ({
  loading: false,
  dataFrame: { labels: [], totalRows: 0, rows: [] },
  page: 0,
  pageSize: 25,
  checkedLabels: new Set<string>(),
  checkedRows: new Set<number>(),
  decimalsPrecision: 3,
  feedbackMessage: '',
  feedbackMessageOpen: false,
  scalingMethod: 'none',
});

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',
  DataImported = 'DATA_IMPORTED',
  DataFetched = 'DATA_FETCHED',
  CloseFeedbackMessage = 'CLOSE_FEEDBACK_MESSAGE',
  DataframeDropped = 'DATAFRAME_DROPPED',

  ChangePage = 'CHANGE_PAGE',
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  CheckRow = 'CHECK_ROW',
  CheckLabel = 'CHECK_LABEL',

  DropDataSuccess = 'DROP_DATA_SUCCESS',
  ChangeScalingMethod = 'CHANGE_SCALING_METHOD',
  ScaleDataSuccess = 'SCALE_DATA_SUCCESS',

  ChangeDecimals = 'CHANGE_DECIMALS',
}

interface Action {
  type: ActionType;
  payload?: DataFrame | number | string;
}

export type DataManagerDispatcher = React.Dispatch<Action>;

export const dataManagerStateReducer = (state: DataManagerState, action: Action): DataManagerState => {
  switch (action.type) {
    case ActionType.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.EndLoading: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.DataImported: {
      return {
        ...state,
        feedbackMessage: 'Data imported!',
        feedbackMessageOpen: true,
        page: 0,
      };
    }

    case ActionType.DataFetched: {
      return {
        ...state,
        loading: false,
        dataFrame: action.payload as DataFrame,
      };
    }

    case ActionType.CloseFeedbackMessage: {
      if (!state.feedbackMessageOpen) return state;

      return {
        ...state,
        feedbackMessage: '',
        feedbackMessageOpen: false,
      };
    }

    case ActionType.DataframeDropped: {
      return {
        ...state,
        loading: false,
        dataFrame: { labels: [], totalRows: 0, rows: [] },
        page: 0,
        pageSize: 25,
        feedbackMessage: 'DataFrame dropped!',
        feedbackMessageOpen: true,
      };
    }

    case ActionType.ChangePage: {
      return {
        ...state,
        page: action.payload as number,
      };
    }

    case ActionType.ChangePageSize: {
      return {
        ...state,
        page: 0,
        pageSize: action.payload as number,
      };
    }

    case ActionType.CheckLabel: {
      const checkedLabel = action.payload as string;

      const newSet = new Set(state.checkedLabels);

      if (newSet.has(checkedLabel)) newSet.delete(checkedLabel);
      else newSet.add(checkedLabel);

      return {
        ...state,
        checkedLabels: newSet,
      };
    }

    case ActionType.CheckRow: {
      const checkedRow = action.payload as number;

      const newSet = new Set(state.checkedRows);

      if (newSet.has(checkedRow)) newSet.delete(checkedRow);
      else newSet.add(checkedRow);

      return {
        ...state,
        checkedRows: newSet,
      };
    }

    case ActionType.DropDataSuccess: {
      return {
        ...state,
        checkedLabels: new Set<string>(),
        checkedRows: new Set<number>(),
        feedbackMessage: 'Rows & Columns dropped!',
        feedbackMessageOpen: true,
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
        feedbackMessage: 'Dataframe scaled!',
        feedbackMessageOpen: true,
      };
    }

    case ActionType.ChangeDecimals: {
      return {
        ...state,
        decimalsPrecision: action.payload as DecimalsPrecision,
      };
    }

    default: {
      throw 'Action type not implemented!';
    }
  }
};
