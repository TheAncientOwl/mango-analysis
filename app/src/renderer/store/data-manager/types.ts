// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { IDataFrame, DecimalsPrecision } from '@modules/data-manager/data-frame-viewer/types';

export enum ActionType {
  Loading = 'DATA_MANAGER__LOADING',
  FetchDataSuccess = 'DATA_MANAGER__FETCH_DATA_SUCCESS',
  CloseFeedbackMessage = 'DATA_MANAGER__CLOSE_FEEDBACK_MESSAGE',
  ChangePage = 'DATA_MANAGER__CHANGE_PAGE',
  ChangePageSize = 'DATA_MANAGER__CHANGE_PAGE_SIZE',
  CheckLabel = 'DATA_MANAGER__CHECK_LABEL',
  CheckRow = 'DATA_MANAGER__CHECK_ROW',
  ChangeDecimalsPrecision = 'DATA_MANAGER__CHANGE_DECIMALS_PRECISION',
  ColumnsRowsDropped = 'DATA_MANAGER__COLUMNS_ROWS_DROPPED',
  DataFrameDropped = 'DATA_MANAGER__DATA_FRAME_DROPPED',
  CSVImported = 'DATA_MANAGER__CSV_IMPORTED',
  CSVImportCanceled = 'DATA_MANAGER__CSV_IMPORT_CANCELED',
  ChangeScalingMethod = 'DATA_MANAGER__CHANGE_SCALING_METHOD',
  ScaledData = 'DATA_MANAGER__SCALED_DATA',
}

interface Loading {
  type: typeof ActionType.Loading;
}

type FetchDataPayloadType = {
  dataframe: IDataFrame;
  feedbackMessage: string;
};
interface FetchDataSuccess {
  type: typeof ActionType.FetchDataSuccess;
  payload: FetchDataPayloadType;
}

interface CloseFeedbackMessage {
  type: typeof ActionType.CloseFeedbackMessage;
}

interface ChangePage {
  type: typeof ActionType.ChangePage;
  payload: number;
}

interface ChangePageSize {
  type: typeof ActionType.ChangePageSize;
  payload: number;
}

interface CheckLabel {
  type: typeof ActionType.CheckLabel;
  payload: string;
}

interface CheckRow {
  type: typeof ActionType.CheckRow;
  payload: number;
}

interface ChangeDecimalsPrecision {
  type: typeof ActionType.ChangeDecimalsPrecision;
  payload: DecimalsPrecision;
}

interface ColumnsRowsDropped {
  type: typeof ActionType.ColumnsRowsDropped;
}

interface DataFrameDropped {
  type: typeof ActionType.DataFrameDropped;
}

interface CSVImportCanceled {
  type: typeof ActionType.CSVImportCanceled;
}

export type ScalingMethodType =
  | 'none'
  | 'maximum_absolute_scaling'
  | 'min_max_scaling'
  | 'z_score_scaling'
  | 'robust_scaling';
interface ChangeScalingMethod {
  type: typeof ActionType.ChangeScalingMethod;
  payload: ScalingMethodType;
}

interface DataScaled {
  type: typeof ActionType.ScaledData;
}

interface CSVImported {
  type: typeof ActionType.CSVImported;
}

export type DispatchTypes =
  | Loading
  | FetchDataSuccess
  | CloseFeedbackMessage
  | ChangePage
  | ChangePageSize
  | CheckLabel
  | CheckRow
  | ChangeDecimalsPrecision
  | ColumnsRowsDropped
  | DataFrameDropped
  | CSVImportCanceled
  | ChangeScalingMethod
  | DataScaled
  | CSVImported;

export type Dispatch = ReduxDispatch<DispatchTypes>;
