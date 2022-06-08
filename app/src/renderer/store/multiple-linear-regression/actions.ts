import { Dispatch, ActionType } from './types';

import { axios } from '@config/.';

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

export const setIndependentVariables = (values: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetIndependentVariables, payload: values });
};

export const setDependentVariable = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetDependentVariable, payload: value });
};

export const setRandState = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetRandState, payload: value });
};

export const setTestSize = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.SetTestSize, payload: value });
};

export const runModel =
  (xLabels: string[], yLabel: string, testSize: number, randomState: number) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/multiple-linear-regression/run-model', {
      xLabels,
      yLabel,
      testSize,
      randomState,
    });

    dispatch({ type: ActionType.ModelFinished, payload: res.data });
  };

export const fetchVariables = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/multiple-linear-regression/variables');

  dispatch({ type: ActionType.FetchedVariables, payload: res.data.variables });
};

export const predict = (values: number[]) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.post('/multiple-linear-regression/predict', { values });

  dispatch({ type: ActionType.PredictionFinished, payload: res.data.prediction });
};

export const changeValuesToPredict = (values: number[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeValuesToPredict, payload: values });
};
