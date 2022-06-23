// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'CORRESPONDENCE_ANALYSIS__LOADING',
  Reset = 'CORRESPONDENCE_ANALYSIS__RESET',

  NextStep = 'CORRESPONDENCE_ANALYSIS__NEXT_STEP',
  PrevStep = 'CORRESPONDENCE_ANALYSIS__PREV_STEP',
  UnlockNextStep = 'CORRESPONDENCE_ANALYSIS__UNLOCK_NEXT_STEP',
  LockNextStep = 'CORRESPONDENCE_ANALYSIS__LOCK_NEXT_STEP',
  JumpToStep = 'CORRESPONDENCE_ANALYSIS__JUMP_TO_STEP',
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

export type DispatchTypes = 
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep;

export type Dispatch = ReduxDispatch<DispatchTypes>;

