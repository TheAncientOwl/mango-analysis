import { axios } from '@config/.';

import { Dispatch, ActionType } from './types';

export const nextStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.NextStep });
};

export const prevStep = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PrevStep });
};

export const fetchPossibleTargetsAndFeatures = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/pca/possible/targets&features');

  dispatch({ type: ActionType.FetchedPossibleTargetsFeatures, payload: res.data });
};

export const changeTarget = (target: string) => (disptch: Dispatch) => {
  disptch({ type: ActionType.ChangeTarget, payload: target });
};

export const changeFeatures = (features: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeFeatures, payload: features });
};

export const unlockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.UnlockNextStep, payload: step });
};

export const lockNextStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.LockNextStep, payload: step });
};

export const setServerTargetAndFeatures = (target: string, features: string[]) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('pca/set/target&features', {
    target,
    features,
  });

  dispatch({ type: ActionType.ServerSetTargetFeaturesSuccess });
};

export const fetchScaledDataStatus = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/pca/was-data-scaled');

  dispatch({ type: ActionType.FetchedScaleDataStatus, payload: res.data.scaledData });
};

export const scaleData = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/pca/scale-data');

  dispatch({ type: ActionType.ScaledData });
};

export const jumpToStep = (step: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.JumpToStep, payload: step });
};

export const fetchCorrelationMatrixPath = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/pca/plot/correlation-matrix');

  dispatch({ type: ActionType.FetchedCorrelationMatrixPath, payload: res.data.imagePath });
};

export const fetchAnalysisHints = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/pca/analyze');

  const res = await axios.get('/pca/components-count-hints');

  dispatch({ type: ActionType.FetchedAnalysisHints, payload: res.data });
};

export const changeComponentsCount = (count: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangeComponentsCount, payload: count });
};

export const runAnalysis = (componentsCount: number) => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  await axios.post('/pca/analyze', { componentsCount });

  dispatch({ type: ActionType.AnalysisFinished });
};

export const fetchLoadingsMatrixPath = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/pca/plot/loadings-matrix');

  dispatch({ type: ActionType.FetchedLoadingsMatrixPath, payload: res.data.imagePath });
};

export const fetchTargetsLabelsPCA = () => async (dispatch: Dispatch) => {
  dispatch({ type: ActionType.Loading });

  const res = await axios.get('/pca/targets&labels');

  dispatch({ type: ActionType.FetchedLabelsTargetsPCA, payload: res.data });
};

export const pushDefaultPlot = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.PushDefaultPlot });
};

export const changePlotAxisX = (index: number, value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotAxisX, payload: { index, value } });
};

export const changePlotAxisY = (index: number, value: string) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotAxisY, payload: { index, value } });
};

export const fetchPlotSrc =
  (index: number, pcX: string, pcY: string, targets: string[], annot: boolean, legend: boolean) =>
  async (dispatch: Dispatch) => {
    dispatch({ type: ActionType.Loading });

    const res = await axios.post('/pca/plot/2D', { pcX, pcY, targets, annot, legend });

    dispatch({
      type: ActionType.FetchedPlotSrc,
      payload: {
        index,
        value: res.data.imagePath,
      },
    });
  };

export const clearPlots = () => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ClearPlots });
};

export const togglePlotAnnot = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotAnnot, payload: index });
};

export const togglePlotLegend = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotLegend, payload: index });
};

export const changePlotTargets = (index: number, targets: string[]) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.ChangePlotTargets, payload: { index, targets } });
};

export const togglePlotOpen = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.TogglePlotOpen, payload: index });
};

export const deletePlot = (index: number) => (dispatch: Dispatch) => {
  dispatch({ type: ActionType.DeletePlot, payload: index });
};
