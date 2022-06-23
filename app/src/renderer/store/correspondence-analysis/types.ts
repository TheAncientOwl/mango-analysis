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
  | AnalysisFinished;

export type Dispatch = ReduxDispatch<DispatchTypes>;
