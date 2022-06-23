// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

export enum ActionType {
  Loading = 'KNN__LOADING',
  Reset = 'KNN__RESET',

  NextStep = 'KNN__NEXT_STEP',
  PrevStep = 'KNN__PREV_STEP',
  UnlockNextStep = 'KNN__UNLOCK_NEXT_STEP',
  LockNextStep = 'KNN__LOCK_NEXT_STEP',
  JumpToStep = 'KNN__JUMP_TO_STEP',
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

