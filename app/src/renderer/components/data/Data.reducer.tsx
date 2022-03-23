import React from 'react';

// import { Data, Decimals } from '@renderer/components/DataFrame';

export enum DataActionType {
  ImportData = 'IMPORT_DATA',
  ImportDataSuccess = 'IMPORT_DATA_SUCCESS',
}

interface DataState {
  fetching: boolean;
  // pageIndex: number;
  // pageSize: number;
  // data: Data;
  // selectedLabels: Set<string>;
  // selectedColumns: Set<number>;
  // decimals: Decimals;
}

interface DataAction {
  type: DataActionType;
  payload?: string;
}

export type DataDispatcher = React.Dispatch<DataAction>;

export const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case DataActionType.ImportData: {
      return {
        ...state,
        fetching: true,
      };
    }

    case DataActionType.ImportDataSuccess: {
      return {
        ...state,
        fetching: false,
      };
    }

    default:
      throw 'Not implemented';
  }
};
