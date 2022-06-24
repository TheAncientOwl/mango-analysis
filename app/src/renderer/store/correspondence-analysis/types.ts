// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { IBasicDataFrame } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'CORRESPONDENCE_ANALYSIS__LOADING',
  Reset = 'CORRESPONDENCE_ANALYSIS__RESET',

  NextStep = 'CORRESPONDENCE_ANALYSIS__NEXT_STEP',
  PrevStep = 'CORRESPONDENCE_ANALYSIS__PREV_STEP',
  UnlockNextStep = 'CORRESPONDENCE_ANALYSIS__UNLOCK_NEXT_STEP',
  LockNextStep = 'CORRESPONDENCE_ANALYSIS__LOCK_NEXT_STEP',
  JumpToStep = 'CORRESPONDENCE_ANALYSIS__JUMP_TO_STEP',

  ChangeComponentsN = 'CORRESPONDENCE_ANALYSIS__CHANGE_COMPONENTS_N',
  ChangeIterN = 'CORRESPONDENCE_ANALYSIS__CHANGE_ITER_N',
  ChangeRowsName = 'CORRESPONDENCE_ANALYSIS__CHANGE_ROWS_NAME',
  ChangeColumnsName = 'CORRESPONDENCE_ANALYSIS__CHANGE_COLUMNS_NAME',

  AnalysisFinished = 'CORRESPONDENCE_ANALYSIS__ANALYSIS_FINISHED',

  ChangePlotTitle = 'CORRESPONDENCE_ANALYSIS__CHANGE_PLOT_TITLE',
  ChangePlotComponentX = 'CORRESPONDENCE_ANALYSIS__CHANGE_PLOT_COMPONENT_X',
  ChangePlotComponentY = 'CORRESPONDENCE_ANALYSIS__CHANGE_PLOT_COMPONENT_Y',
  TogglePlotRowLabels = 'CORRESPONDENCE_ANALYSIS__TOGGLE_PLOT_ROW_LABELS',
  TogglePlotColLabels = 'CORRESPONDENCE_ANALYSIS__TOGGLE_PLOT_COL_LABELS',
  FetchedPlotSrc = 'CORRESPONDENCE_ANALYSIS__FETCHED_PLOT_SRC',
  PushDefaultPlot = 'CORRESPONDENCE_ANALYSIS__PUSH_DEFAULT_PLOT',
  TogglePlotOpen = 'CORRESPONDENCE_ANALYSIS__TOGGLE_PLOT_OPEN',
  DeletePlot = 'CORRESPONDENCE_ANALYSIS__DELETE_PLOT',
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

interface ChangeComponentsN {
  type: ActionType.ChangeComponentsN;
  payload: number;
}

interface ChangeIterN {
  type: ActionType.ChangeIterN;
  payload: number;
}

interface ChangeRowsName {
  type: ActionType.ChangeRowsName;
  payload: string;
}

interface ChangeColumnsName {
  type: ActionType.ChangeColumnsName;
  payload: string;
}

export interface ICorrespondenceAnalysisResult {
  rowCoordinates: IBasicDataFrame;
  columnCoordinates: IBasicDataFrame;
  summary: IBasicDataFrame;
  totalInertia: number | undefined;
}
interface AnalysisFinished {
  type: ActionType.AnalysisFinished;
  payload: ICorrespondenceAnalysisResult;
}

interface ChangePlotTitle {
  type: ActionType.ChangePlotTitle;
  payload: {
    index: number;
    value: string;
  };
}

interface ChangePlotComponentX {
  type: ActionType.ChangePlotComponentX;
  payload: {
    index: number;
    value: number;
  };
}

interface ChangePlotComponentY {
  type: ActionType.ChangePlotComponentY;
  payload: {
    index: number;
    value: number;
  };
}

interface TogglePlotRowLabels {
  type: ActionType.TogglePlotRowLabels;
  payload: number;
}

interface TogglePlotColLabels {
  type: ActionType.TogglePlotColLabels;
  payload: number;
}

interface PushDefaultPlot {
  type: ActionType.PushDefaultPlot;
}

interface FetchedPlotSrc {
  type: ActionType.FetchedPlotSrc;
  payload: {
    index: number;
    value: string;
  };
}

interface TogglePlotOpen {
  type: ActionType.TogglePlotOpen;
  payload: number;
}

interface DeletePlot {
  type: ActionType.DeletePlot;
  payload: number;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | ChangeComponentsN
  | ChangeIterN
  | ChangeRowsName
  | ChangeColumnsName
  | AnalysisFinished
  | ChangePlotTitle
  | ChangePlotComponentX
  | ChangePlotComponentY
  | TogglePlotRowLabels
  | TogglePlotColLabels
  | PushDefaultPlot
  | FetchedPlotSrc
  | TogglePlotOpen
  | DeletePlot;

export type Dispatch = ReduxDispatch<DispatchTypes>;
