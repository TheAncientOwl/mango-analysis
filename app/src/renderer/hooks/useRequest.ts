import React from 'react';
import { axios } from '@renderer/config';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

export enum RequestState {
  None,
  Pending,
  Solved,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecuteRequestFn = (req: AxiosRequestConfig<any>, callback: (res: AxiosResponse<any>) => void) => void;

interface RequestResult {
  state: RequestState;
  execute: ExecuteRequestFn;
}

export const useRequest = (): RequestResult => {
  const [state, setState] = React.useState(RequestState.None);
  axios.request({});

  const execute: ExecuteRequestFn = (req, callback) => {
    setState(RequestState.Pending);
    axios.request(req).then(res => {
      setState(RequestState.Solved);
      callback(res);
    });
  };

  return { state, execute };
};
