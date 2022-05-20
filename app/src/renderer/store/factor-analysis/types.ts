// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { BasicDataFrameProps } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'LOADING',

  NextStep = 'NEXT_STEP',
  PrevStep = 'PREV_STEP',
  UnlockNextStep = 'UNLOCK_NEXT_STEP',
  LockNextStep = 'LOCK_NEXT_STEP',

  FetchedPossibleFeatures = 'FETCHED_POSSIBLE_FEATURES',
  ChangeFeatures = 'CHANGE_FEATURES',
  ServerSetFeaturesSuccess = 'SERVER_SET_FEATURES_SUCCESS',

  ChangeFactorsNumber = 'CHANGE_FACTORS_NUMBER',
  FetchedBartlettResults = 'FETCHED_BARTLETT_RESULTS',
  FetchedKmoResult = 'FETCHED_KMO_RESULT',
  AnalysisFinished = 'ANALYSIS_FINISHED',
  FetchedDefaultHints = 'FETCHED_DEFAULT_HINTS',
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
  | ServerSetFeaturesSuccess;

export type Dispatch = ReduxDispatch<DispatchTypes>;
