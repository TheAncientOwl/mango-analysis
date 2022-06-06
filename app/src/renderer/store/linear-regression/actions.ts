import { axios } from '@config/.';

import { Dispatch, ActionType } from './types';

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Reset });
};

export const nextStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.NextStep });
};

export const prevStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PrevStep });
};

export const unlockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.UnlockNextStep, payload: step });
};

export const lockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.LockNextStep, payload: step });
};

export const jumpToStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.JumpToStep, payload: step });
};

export const fetchVariables = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/linear-regression/variables');

  dispatch({ type: ActionType.FetchedVariables, payload: res.data.variables });
};

export const changeLabelX = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeLabelX, payload: value });
};

export const changeLabelY = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeLabelY, payload: value });
};

export const changeTestSize = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeTestSize, payload: value });
};

export const changeRandomState = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeRandomState, payload: value });
};

export const runModel =
  (xLabel: string, yLabel: string, testSize: number, randomState: number) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/linear-regression/run-model', {
      xLabel,
      yLabel,
      testSize,
      randomState,
    });

    dispatch({ type: ActionType.ModelFinished, payload: res.data });
  };

export const predict = (value: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.post(`/linear-regression/predict`, { value });

  dispatch({ type: ActionType.PredictionFinished, payload: res.data.prediction });
};

export const changeValueToPredict = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeValueToPredict, payload: value });
};
