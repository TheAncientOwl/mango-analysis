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

type ExecuteRequestFn = (req: Request, callback: (res: AxiosResponse<unknown>) => void) => void;

interface RequestResult {
  state: RequestState;
  result: AxiosResponse<unknown>;
  execute: ExecuteRequestFn;
}

export const useRequest = (): RequestResult => {
  const [state, setState] = React.useState(RequestState.None);
  const [result, setResult] = React.useState<AxiosResponse<unknown, unknown>>(null);

  const execute: ExecuteRequestFn = (req, callback) => {
    setState(RequestState.Pending);
    axios.request(req).then(res => {
      setState(RequestState.Solved);
      setResult(res);
      callback(res);
    });
  };

  return { state, result, execute };
};
