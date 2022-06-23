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

