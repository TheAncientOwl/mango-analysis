import { DataFrame } from '@renderer/components/data-manager/data-frame-viewer/types';

export const LOADING = 'LOADING';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAIL = 'FETCH_DATA_FAIL';

export interface Loading {
  type: typeof LOADING;
}

export interface FetchDataSuccess {
  type: typeof FETCH_DATA_SUCCESS;
  payload: DataFrame;
}

export interface FetchDataFail {
  type: typeof FETCH_DATA_FAIL;
}

export type DataManagerDispatchTypes = Loading | FetchDataSuccess | FetchDataFail;
