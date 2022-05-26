// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { BasicDataFrameProps } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'FACTOR_ANALYSIS__LOADING',
  Reset = 'FACTOR_ANALYSIS__RESET',

  NextStep = 'FACTOR_ANALYSIS__NEXT_STEP',
  PrevStep = 'FACTOR_ANALYSIS__PREV_STEP',
  UnlockNextStep = 'FACTOR_ANALYSIS__UNLOCK_NEXT_STEP',
  LockNextStep = 'FACTOR_ANALYSIS__LOCK_NEXT_STEP',

  FetchedPossibleFeatures = 'FACTOR_ANALYSIS__FETCHED_POSSIBLE_FEATURES',
  ChangeFeatures = 'FACTOR_ANALYSIS__CHANGE_FEATURES',
  ServerSetFeaturesSuccess = 'FACTOR_ANALYSIS__SERVER_SET_FEATURES_SUCCESS',

  ChangeFactorsNumber = 'FACTOR_ANALYSIS__CHANGE_FACTORS_NUMBER',
  FetchedBartlettResults = 'FACTOR_ANALYSIS__FETCHED_BARTLETT_RESULTS',
  FetchedKmoResult = 'FACTOR_ANALYSIS__FETCHED_KMO_RESULT',
  AnalysisFinished = 'FACTOR_ANALYSIS__ANALYSIS_FINISHED',
  FetchedDefaultHints = 'FACTOR_ANALYSIS__FETCHED_DEFAULT_HINTS',
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

interface FetchedPossibleFeatures {
  type: ActionType.FetchedPossibleFeatures;
  payload: string[];
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
}

export type BartlettTest = {
  chiSquare: number;
  pValue: number;
};
interface FetchedTestsResults {
  type: ActionType.FetchedBartlettResults;
  payload: BartlettTest;
}

interface FetchedKmoResult {
  type: ActionType.FetchedKmoResult;
  payload: number;
}

interface AnalysisFinished {
  type: ActionType.AnalysisFinished;
}

interface ChangeFactorsNumber {
  type: ActionType.ChangeFactorsNumber;
  payload: number;
}

export type DefaultHints = {
  eigenvalues: BasicDataFrameProps;
  screePlotSrc: string;
};
interface FetchedDefaultHints {
  type: ActionType.FetchedDefaultHints;
  payload: DefaultHints;
}

interface ServerSetFeaturesSuccess {
  type: ActionType.ServerSetFeaturesSuccess;
}

interface Reset {
  type: ActionType.Reset;
}

export type DispatchTypes =
  | Loading
  | NextStep
  | PrevStep
  | FetchedPossibleFeatures
  | ChangeFeatures
  | FetchedPossibleFeatures
  | AnalysisFinished
  | FetchedTestsResults
  | ChangeFactorsNumber
  | FetchedKmoResult
  | FetchedDefaultHints
  | UnlockNextStep
  | LockNextStep
  | ServerSetFeaturesSuccess
  | Reset;

export type Dispatch = ReduxDispatch<DispatchTypes>;
