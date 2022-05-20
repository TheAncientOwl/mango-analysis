// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { BasicDataFrameProps } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'PCA__LOADING',
  Reset = 'PCA__RESET',

  NextStep = 'PCA__NEXT_STEP',
  PrevStep = 'PCA__PREV_STEP',
  UnlockNextStep = 'PCA__UNLOCK_NEXT_STEP',
  LockNextStep = 'PCA__LOCK_NEXT_STEP',
  JumpToStep = 'PCA__JUMP_TO_STEP',

  FetchedPossibleTargetsFeatures = 'PCA__FETCHED_POSSIBLE_TARGETS_FEATURES',
  ChangeTarget = 'PCA__CHANGE_TARGET',
  ChangeFeatures = 'PCA__CHANGE_FEATURES',

  ServerSetTargetFeaturesSuccess = 'PCA__SERVER_SET_TARGET_FEATURES_SUCCESS',

  FetchedCorrelationMatrixPath = 'PCA__FETCHED_CORRELATION_MATRIX_PATH',
  FetchedLoadingsMatrixPath = 'PCA__FETCHED_LOADINGS_MATRIX_PATH',

  FetchedAnalysisHints = 'PCA__FETCHED_COMPONENTS_COUNT_HINTS',
  ChangeComponentsCount = 'PCA__CHANGE_COMPONENTS_COUNT',
  AnalysisFinished = 'PCA__ANALYSIS_FINISHED',

  FetchedLabelsTargetsPCA = 'PCA__FETCHED_LABELS_TARGETS_PCA',

  PushDefaultPlot = 'PCA__PUSH_DEFAULT_PLOT',
  ChangePlotAxisX = 'PCA__CHANGE_PLOT_AXIS_X',
  ChangePlotAxisY = 'PCA__CHANGE_PLOT_AXIS_Y',
  FetchedPlotSrc = 'PCA__FETCHED_PLOT_SRC',
  TogglePlotAnnot = 'PCA__TOGGLE_PLOT_ANNOT',
  TogglePlotLegend = 'PCA__TOGGLE_PLOT_LEGEND',
  ChangePlotTargets = 'PCA__CHANGE_PLOT_TARGETS',
  ClearPlots = 'PCA__CLEAR_PLOTS',
  TogglePlotOpen = 'PCA__TOGGLE_PLOT_OPEN',
  DeletePlot = 'PCA__DELETE_PLOT',
  ChangePlotTitle = 'PCA__CHANGE_PLOT_TITLE',

  ExportLoadingsEnded = 'PCA__EXPORT_LOADINGS_ENDED',
  ExportLoadingsFail = 'PCA__EXPORT_LOADINGS_FAIL',

  ExportPCAEnded = 'PCA__EXPORT_PCA_ENDED',
  ExportPCAFail = 'PCA__EXPORT_PCA_FAIL',

  ToggleHints = 'PCA__TOGGLE_HINTS',
}

interface Loading {
  type: ActionType.Loading;
}

interface NextStep {
  type: ActionType.NextStep;
}

interface PrevStep {
  type: ActionType.PrevStep;
}

interface UnlockNextStep {
  type: ActionType.UnlockNextStep;
  payload: number;
}

interface LockNextStep {
  type: ActionType.LockNextStep;
  payload: number;
}

export type PossibleTF = {
  targets: string[];
  features: string[];
};
interface FetchedPossibleTargetsFeatures {
  type: ActionType.FetchedPossibleTargetsFeatures;
  payload: PossibleTF;
}

interface ChangeTarget {
  type: ActionType.ChangeTarget;
  payload: string;
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
}

interface ServerSetTargetsFeaturesSuccess {
  type: ActionType.ServerSetTargetFeaturesSuccess;
}

interface JumpToStep {
  type: ActionType.JumpToStep;
  payload: number;
}

interface FetchedCorrelationMatrixPath {
  type: ActionType.FetchedCorrelationMatrixPath;
  payload: string;
}

interface FetchedLoadingsMatrixPath {
  type: ActionType.FetchedLoadingsMatrixPath;
  payload: string;
}

export interface AnalysisHints {
  kaiserPath: string;
  threshold70: BasicDataFrameProps;
  eigenvaluesG1: BasicDataFrameProps;
}
interface FetchedAnalysisHints {
  type: ActionType.FetchedAnalysisHints;
  payload: AnalysisHints;
}

interface ChangeComponentsCount {
  type: ActionType.ChangeComponentsCount;
  payload: number;
}

interface AnalysisFinished {
  type: ActionType.AnalysisFinished;
}

export type LabelsTargetsPCA = {
  labels: string[];
  targets: string[];
};
interface FetchedLabelsTargetsPCA {
  type: ActionType.FetchedLabelsTargetsPCA;
  payload: LabelsTargetsPCA;
}

interface PushDefaultPlot {
  type: ActionType.PushDefaultPlot;
}

type ChangePlot = {
  index: number;
  value: string;
};
interface ChangePlotAxisX {
  type: ActionType.ChangePlotAxisX;
  payload: ChangePlot;
}

interface ChangePlotAxisY {
  type: ActionType.ChangePlotAxisY;
  payload: ChangePlot;
}

interface FetchedPlotSrc {
  type: ActionType.FetchedPlotSrc;
  payload: ChangePlot;
}

interface ClearPlots {
  type: ActionType.ClearPlots;
}

interface TogglePlotAnnot {
  type: ActionType.TogglePlotAnnot;
  payload: number;
}

interface TogglePlotLegend {
  type: ActionType.TogglePlotLegend;
  payload: number;
}

export type PlotTargets = {
  targets: string[];
  index: number;
};
interface ChangePlotTargets {
  type: ActionType.ChangePlotTargets;
  payload: PlotTargets;
}

interface TogglePlotOpen {
  type: ActionType.TogglePlotOpen;
  payload: number;
}

interface DeletePlot {
  type: ActionType.DeletePlot;
  payload: number;
}

interface ChangePlotTitle {
  type: ActionType.ChangePlotTitle;
  payload: ChangePlot;
}

interface Reset {
  type: ActionType.Reset;
}

interface ExportLoadingsEnded {
  type: ActionType.ExportLoadingsEnded;
}

interface ExportLoadingsFail {
  type: ActionType.ExportLoadingsFail;
}

interface ExportPCAEnded {
  type: ActionType.ExportPCAEnded;
}

interface ExportPCAFail {
  type: ActionType.ExportPCAFail;
}

interface ToggleHints {
  type: ActionType.ToggleHints;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | FetchedPossibleTargetsFeatures
  | ChangeTarget
  | ChangeFeatures
  | ServerSetTargetsFeaturesSuccess
  | JumpToStep
  | FetchedCorrelationMatrixPath
  | FetchedAnalysisHints
  | ChangeComponentsCount
  | AnalysisFinished
  | FetchedLoadingsMatrixPath
  | FetchedLabelsTargetsPCA
  | PushDefaultPlot
  | ChangePlotAxisX
  | ChangePlotAxisY
  | FetchedPlotSrc
  | ClearPlots
  | TogglePlotAnnot
  | TogglePlotLegend
  | ChangePlotTargets
  | TogglePlotOpen
  | DeletePlot
  | ChangePlotTitle
  | ExportLoadingsEnded
  | ExportLoadingsFail
  | ExportPCAEnded
  | ExportPCAFail
  | ToggleHints;

export type Dispatch = ReduxDispatch<DispatchTypes>;
