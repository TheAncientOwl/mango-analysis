// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { DataFrame, DecimalsPrecision } from '@renderer/components/data-manager/data-frame-viewer/types';

export enum DataManagerActionTypes {
  Loading = 'LOADING',
  FetchDataSuccess = 'FETCH_DATA_SUCCESS',
  CloseFeedbackMessage = 'CLOSE_FEEDBACK_MESSAGE',
  ChangePage = 'CHANGE_PAGE',
  ChangePageSize = 'CHANGE_PAGE_SIZE',
  CheckLabel = 'CHECK_LABEL',
  CheckRow = 'CHECK_ROW',
  ChangeDecimalsPrecision = 'CHANGE_DECIMALS_PRECISION',
  ColumnsRowsDropped = 'COLUMNS_ROWS_DROPPED',
  DataFrameDropped = 'DATA_FRAME_DROPPED',
  CSVImportCanceled = 'CSV_IMPORT_CANCELED',
  ChangeScalingMethod = 'CHANGE_SCALING_METHOD',
  ScaledData = 'SCALED_DATA',
}

interface Loading {
  type: typeof DataManagerActionTypes.Loading;
}

type FetchDataPayloadType = {
  dataframe: DataFrame;
  feedbackMessage: string;
};
interface FetchDataSuccess {
  type: typeof DataManagerActionTypes.FetchDataSuccess;
  payload: FetchDataPayloadType;
}

interface CloseFeedbackMessage {
  type: typeof DataManagerActionTypes.CloseFeedbackMessage;
}

interface ChangePage {
  type: typeof DataManagerActionTypes.ChangePage;
  payload: number;
}

interface ChangePageSize {
  type: typeof DataManagerActionTypes.ChangePageSize;
  payload: number;
}

interface CheckLabel {
  type: typeof DataManagerActionTypes.CheckLabel;
  payload: string;
}

interface CheckRow {
  type: typeof DataManagerActionTypes.CheckRow;
  payload: number;
}

interface ChangeDecimalsPrecision {
  type: typeof DataManagerActionTypes.ChangeDecimalsPrecision;
  payload: DecimalsPrecision;
}

interface ColumnsRowsDropped {
  type: typeof DataManagerActionTypes.ColumnsRowsDropped;
}

interface DataFrameDropped {
  type: typeof DataManagerActionTypes.DataFrameDropped;
}

interface CSVImportCanceled {
  type: typeof DataManagerActionTypes.CSVImportCanceled;
}

export type ScalingMethodType =
  | 'none'
  | 'maximum_absolute_scaling'
  | 'min_max_scaling'
  | 'z_score_scaling'
  | 'robust_scaling';
export interface ChangeScalingMethod {
  type: typeof DataManagerActionTypes.ChangeScalingMethod;
  payload: ScalingMethodType;
}

export interface DataScaled {
  type: typeof DataManagerActionTypes.ScaledData;
}

export type DataManagerDispatchTypes =
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
  | DataScaled;

export type DataManagerDispatch = ReduxDispatch<DataManagerDispatchTypes>;
