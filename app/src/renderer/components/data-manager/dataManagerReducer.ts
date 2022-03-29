import React from 'react';

import { DataFrameConfig, DataFrame } from './data-frame-viewer/types';

interface DataManagerState extends DataFrameConfig {
  loading: boolean;
  feedbackMessage: string;
  feedbackMessageOpen: boolean;
}

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
}

interface Action {
  type: ActionType;
  payload?: DataFrame | number | string;
}

export type DataManagerDispatcher = React.Dispatch<Action>;

export const dataManagerReducer = (state: DataManagerState, action: Action): DataManagerState => {
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
      const selectedColumn = action.payload as string;

      const newSet = new Set(state.checkedLabels);

      if (newSet.has(selectedColumn)) newSet.delete(selectedColumn);
      else newSet.add(selectedColumn);

      return {
        ...state,
        checkedLabels: newSet,
      };
    }

    case ActionType.CheckRow: {
      const selectedRow = action.payload as number;

      const newSet = new Set(state.checkedRows);

      if (newSet.has(selectedRow)) newSet.delete(selectedRow);
      else newSet.add(selectedRow);

      return {
        ...state,
        checkedRows: newSet,
      };
    }

    default: {
      throw 'Action type not implemented!';
    }
  }
};
