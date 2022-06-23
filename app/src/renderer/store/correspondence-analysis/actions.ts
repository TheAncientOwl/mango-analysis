import { axios } from '@src/renderer/config';
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

export const changeComponentsN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeComponentsN, payload: value });
};

export const changeIterN = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeIterN, payload: value });
};

export const changeRowsName = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeRowsName, payload: value });
};

export const changeColumnsName = (value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeColumnsName, payload: value });
};

export const runAnalysis =
  (nComponents: number, nIter: number, rowsName: string, columnsName: string) => async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/ca/run', {
      nComponents,
      nIter,
      rowsName,
      columnsName,
    });

    dispatch({ type: ActionType.AnalysisFinished, payload: res.data });
  };
