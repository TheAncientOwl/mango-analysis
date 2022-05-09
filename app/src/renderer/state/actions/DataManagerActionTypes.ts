// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { DataFrame, DecimalsPrecision } from '@renderer/components/data-manager/data-frame-viewer/types';

export const LOADING = 'LOADING';
export interface Loading {
  type: typeof LOADING;
}

export type FetchDataPayloadType = {
  dataframe: DataFrame;
  feedbackMessage: string;
};
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: FetchDataPayloadType;
}

export const CLOSE_FEEDBACK_MESSAGE = 'CLOSE_FEEDBACK_MESSAGE';
export interface CloseFeedbackMessage {
  type: typeof CLOSE_FEEDBACK_MESSAGE;
}

export const DROP_DATA_FRAME = 'DROP_DATA_FRAME';
export interface DropDataFrame {
  type: typeof DROP_DATA_FRAME;
}

export const CHANGE_PAGE = 'CHANGE_PAGE';
export interface ChangePage {
  type: typeof CHANGE_PAGE;
  payload: number;
}

export const CHANGE_PAGE_SIZE = 'CHANGE_PAGE_SIZE';
export interface ChangePageSize {
  type: typeof CHANGE_PAGE_SIZE;
  payload: number;
}

export const CHECK_LABEL = 'CHECK_LABEL';
export interface CheckLabel {
  type: typeof CHECK_LABEL;
  payload: string;
}

export const CHECK_ROW = 'CHECK_ROW';
export interface CheckRow {
  type: typeof CHECK_ROW;
  payload: number;
}

export const CHANGE_DECIMALS_PRECISION = 'CHANGE_DECIMALS_PRECISION';
export interface ChangeDecimalsPrecision {
  type: typeof CHANGE_DECIMALS_PRECISION;
  payload: DecimalsPrecision;
}

export const COLUMNS_ROWS_DROPPED = 'COLUMNS_ROWS_DROPPED';
export interface ColumnsRowsDropped {
  type: typeof COLUMNS_ROWS_DROPPED;
}

export const DATA_FRAME_DROPPED = 'DATA_FRAME_DROPPED';
export interface DataFrameDropped {
  type: typeof DATA_FRAME_DROPPED;
}

export const CSV_IMPORT_CANCELED = 'CSV_IMPORT_CANCELED';
export interface CSVImportCanceled {
  type: typeof CSV_IMPORT_CANCELED;
}

export const CHANGE_SCALING_METHOD = 'CHANGE_SCALING_METHOD';
export interface ChangeScalingMethod {
  type: typeof CHANGE_SCALING_METHOD;
  payload: ScalingMethodType;
}

export const SCALED_DATA = 'SCALED_DATA';
export interface DataScaled {
  type: typeof SCALED_DATA;
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

export type Dispatch = ReduxDispatch<DataManagerDispatchTypes>;

export type ScalingMethodType =
  | 'none'
  | 'maximum_absolute_scaling'
  | 'min_max_scaling'
  | 'z_score_scaling'
  | 'robust_scaling';
