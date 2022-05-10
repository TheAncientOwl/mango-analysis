// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { BasicDataFrameProps } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'LOADING',

  NextStep = 'NEXT_STEP',
  PrevStep = 'PREV_STEP',
  UnlockNextStep = 'UNLOCK_NEXT_STEP',
  LockNextStep = 'LOCK_NEXT_STEP',
  JumpToStep = 'JUMP_TO_STEP',

  FetchedPossibleTargetsFeatures = 'FETCHED_POSSIBLE_TARGETS_FEATURES',
  ChangeTarget = 'CHANGE_TARGET',
  ChangeFeatures = 'CHANGE_FEATURES',

  ServerSetTargetFeaturesSuccess = 'SERVER_SET_TARGET_FEATURES_SUCCESS',

  FetchedScaleDataStatus = 'FETCHED_SCALE_DATA_STATUS',
  ScaledData = 'SCALED_DATA',

  FetchedCorrelationMatrixPath = 'FETCHED_CORRELATION_MATRIX_PATH',
  FetchedLoadingsMatrixPath = 'FETCHED_LOADINGS_MATRIX_PATH',

  FetchedAnalysisHints = 'FETCHED_COMPONENTS_COUNT_HINTS',
  ChangeComponentsCount = 'CHANGE_COMPONENTS_COUNT',
  AnalysisFinished = 'ANALYSIS_FINISHED',

  FetchedLabelsTargetsPCA = 'FETCHED_LABELS_TARGETS_PCA',

  PushDefaultPlot = 'PUSH_DEFAULT_PLOT',
  ChangePlotAxisX = 'CHANGE_PLOT_AXIS_X',
  ChangePlotAxisY = 'CHANGE_PLOT_AXIS_Y',
  FetchedPlotSrc = 'FETCHED_PLOT_SRC',
  TogglePlotAnnot = 'TOGGLE_PLOT_ANNOT',
  TogglePlotLegend = 'TOGGLE_PLOT_LEGEND',
  ChangePlotTargets = 'CHANGE_PLOT_TARGETS',
  ClearPlots = 'CLEAR_PLOTS',
  TogglePlotOpen = 'TOGGLE_PLOT_OPEN',
  DeletePlot = 'DELETE_PLOT',
  ChangePlotNote = 'CHANGE_PLOT_NOTE',
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

interface FetchedScaleDataStatus {
  type: ActionType.FetchedScaleDataStatus;
  payload: boolean;
}

interface ScaledData {
  type: ActionType.ScaledData;
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

interface ChangePlotNote {
  type: ActionType.ChangePlotNote;
  payload: ChangePlot;
}

export type DispatchTypes =
  | Loading
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | FetchedPossibleTargetsFeatures
  | ChangeTarget
  | ChangeFeatures
  | ServerSetTargetsFeaturesSuccess
  | FetchedScaleDataStatus
  | ScaledData
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
  | ChangePlotNote;

export type Dispatch = ReduxDispatch<DispatchTypes>;
