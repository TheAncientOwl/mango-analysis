import { axios } from '@config/.';

import { Dispatch, ActionType, RotationMethod, IFactorLoadings } from './types';

import { store } from '@store/.';
import { IBasicDataFrame } from '@components/BasicDataFrame';

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

export const fetchPossibleFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/possible-features');

  dispatch({ type: ActionType.FetchedPossibleFeatures, payload: res.data.features });
};

export const changeFeatures = (features: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFeatures, payload: features });
};

export const setServerFeatures = (features: string[]) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/factor-analysis/set-features', { features });

  dispatch({ type: ActionType.ServerSetFeaturesSuccess });
};

export const fetchBartlett = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/tests/bartlett');

  dispatch({
    type: ActionType.FetchedBartlettResults,
    payload: {
      chiSquare: res.data.chiSquareValue,
      pValue: res.data.pValue,
    },
  });
};

export const fetchKMO = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/factor-analysis/tests/kmo');

  dispatch({ type: ActionType.FetchedKmoResult, payload: res.data.kmoModel });
};

export const runDefaultAnalysis = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/factor-analysis/default-analysis');

  const res = await axios.get('/factor-analysis/default-hints');

  dispatch({
    type: ActionType.FetchedDefaultHints,
    payload: {
      screePlotSrc: res.data.screePlotPath,
      eigenvalues: res.data.eigenvalues,
    },
  });
};

export const runAnalysis =
  (nFactors: number, rotation = 'none') =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    await axios.post('/factor-analysis/analyze', { nFactors, rotation });

    dispatch({ type: ActionType.AnalysisFinished });
  };

export const resetState = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Reset });
};

export const changeFactorsNumber = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFactorsNumber, payload: value });
};

export const jumpToStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.JumpToStep, payload: step });
};

export const newTab = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.NewTab });
};

export const changeTabFactorsCount = (index: number, count: number) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.ChangeTabFactorsCount,
    payload: {
      index,
      count,
    },
  });
};

export const changeTabRotationMethod = (index: number, method: RotationMethod) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.ChangeTabRotationMethod,
    payload: {
      index,
      method,
    },
  });
};

export const changeTabLoadings = (index: number, loadings: IFactorLoadings) => (dispatch: Dispatch) => {
  dispatch({
    type: ActionType.ChangeTabLoadings,
    payload: {
      index,
      loadings,
    },
  });
};

export const removeTab = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.RemoveTab, payload: index });
};

export const changeCurrentTab = (value: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeCurrentTab, payload: value });
};

export const runTabAnalysis = (index: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const tabConfig = store.getState().factorAnalysis.analysisTabs[index];

  const res = await axios.post('/factor-analysis/run', {
    nFactors: tabConfig.factorsCount,
    rotation: tabConfig.rotationMethod,
  });

  dispatch({
    type: ActionType.TabAnalysisFinished,
    payload: {
      index: index,
      loadings: {
        imagePath: res.data.loadingsPath,
        data: res.data.loadings,
      },
    },
  });
};

export const exportDataFrame = (loadings: IBasicDataFrame) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const savePath = await window.electron.showSaveDialog({
    title: 'Save Loadings',
    defaultPath: await window.electron.resolve(await window.electron.getHomeDir(), 'Loadings.csv'),
    buttonLabel: 'Save',
    filters: [
      { name: 'CSV', extensions: ['csv'] },
      { name: 'All files', extensions: ['*'] },
    ],
  });

  if (savePath !== null)
    await axios.post('/data/export/dataframe/csv', {
      savePath,
      index: loadings.index,
      columns: loadings.columns,
      data: loadings.data,
    });

  dispatch({ type: ActionType.ExportDataframeSuccess });
};
