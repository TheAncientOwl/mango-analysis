import React from 'react';
import { axios } from '@renderer/config';
import { AxiosResponse } from 'axios';

export enum RequestState {
  None,
  Pending,
  Solved,
}

interface Request {
  method: 'get' | 'post';
  url: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ExecuteRequestFn = (req: Request, callback: (res: AxiosResponse<any>) => void) => void;

interface RequestResult {
  state: RequestState;
  execute: ExecuteRequestFn;
}

export const useRequest = (): RequestResult => {
  const [state, setState] = React.useState(RequestState.None);

  const execute: ExecuteRequestFn = (req, callback) => {
    setState(RequestState.Pending);
    axios.request(req).then(res => {
      setState(RequestState.Solved);
      callback(res);
    });
  };

  return { state, execute };
};
