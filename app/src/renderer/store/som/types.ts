// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'SOM__LOADING',
  Reset = 'SOM__RESET',

  NextStep = 'SOM__NEXT_STEP',
  PrevStep = 'SOM__PREV_STEP',
  UnlockNextStep = 'SOM__UNLOCK_NEXT_STEP',
  LockNextStep = 'SOM__LOCK_NEXT_STEP',
  JumpToStep = 'SOM__JUMP_TO_STEP',

  FetchedPossibleFeatures = 'SOM__FETCHED_POSSIBLE_FEATURES',
  ChangeTarget = 'SOM__CHANGE_TARGET',
  ChangeFeatures = 'SOM__CHANGE_FEATURES',
  SetServerFeaturesTargetSuccess = 'SOM__SET_SERVER_FEATURES_TARGET_SUCCESS',

  ModelFinished = 'SOM__MODEL_FINISHED',
  ChangeM = 'SOM__CHANGE_M',
  ChangeN = 'SOM__CHANGE_N',

  PushDefaultPlot = 'SOM__PUSH_DEFAULT_PLOT',
  ChangePlotAxisX = 'SOM__CHANGE_PLOT_AXIS_X',
  ChangePlotAxisY = 'SOM__CHANGE_PLOT_AXIS_Y',
  FetchedPlotSrc = 'SOM__FETCHED_PLOT_SRC',
  FetchedPlotSrcOriginal = 'SOM__FETCHED_PLOT_SRC_ORIGINAL',
  TogglePlotOriginal = 'SOM__TOGGLE_PLOT_ORIGINAL',
  TogglePlotOpen = 'SOM__TOGGLE_PLOT_OPEN',
  DeletePlot = 'SOM__DELETE_PLOT',
  ChangePlotTitle = 'SOM__CHANGE_PLOT_TITLE',
}

interface Loading {
  type: ActionType.Loading;
}

interface Reset {
  type: ActionType.Reset;
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

interface JumpToStep {
  type: ActionType.JumpToStep;
  payload: number;
}

interface FetchedPossibleFeatures {
  type: ActionType.FetchedPossibleFeatures;
  payload: string[];
}

interface ChangeTarget {
  type: ActionType.ChangeTarget;
  payload: string;
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
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

interface FetchedPlotSrcOriginal {
  type: ActionType.FetchedPlotSrcOriginal;
  payload: ChangePlot;
}

interface TogglePlotOriginal {
  type: ActionType.TogglePlotOriginal;
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

interface ModelFinished {
  type: ActionType.ModelFinished;
}

interface TogglePlotOpen {
  type: ActionType.TogglePlotOpen;
  payload: number;
}

interface ChangeM {
  type: ActionType.ChangeM;
  payload: number;
}

interface ChangeN {
  type: ActionType.ChangeN;
  payload: number;
}

interface SetServerFeaturesTargetSuccess {
  type: ActionType.SetServerFeaturesTargetSuccess;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | FetchedPlotSrc
  | FetchedPlotSrcOriginal
  | FetchedPossibleFeatures
  | ChangeFeatures
  | ChangePlotAxisX
  | ChangePlotAxisY
  | ChangePlotTitle
  | ChangeTarget
  | PushDefaultPlot
  | TogglePlotOriginal
  | DeletePlot
  | ModelFinished
  | TogglePlotOpen
  | ChangeM
  | ChangeN
  | SetServerFeaturesTargetSuccess;

export type Dispatch = ReduxDispatch<DispatchTypes>;
