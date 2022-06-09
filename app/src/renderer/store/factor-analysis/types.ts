// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { IBasicDataFrame } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'FACTOR_ANALYSIS__LOADING',
  Reset = 'FACTOR_ANALYSIS__RESET',

  NextStep = 'FACTOR_ANALYSIS__NEXT_STEP',
  PrevStep = 'FACTOR_ANALYSIS__PREV_STEP',
  UnlockNextStep = 'FACTOR_ANALYSIS__UNLOCK_NEXT_STEP',
  LockNextStep = 'FACTOR_ANALYSIS__LOCK_NEXT_STEP',
  JumpToStep = 'FACTOR_ANALYSIS__JUMP_TO_STEP',

  FetchedPossibleFeatures = 'FACTOR_ANALYSIS__FETCHED_POSSIBLE_FEATURES',
  ChangeFeatures = 'FACTOR_ANALYSIS__CHANGE_FEATURES',
  ServerSetFeaturesSuccess = 'FACTOR_ANALYSIS__SERVER_SET_FEATURES_SUCCESS',

  ChangeFactorsNumber = 'FACTOR_ANALYSIS__CHANGE_FACTORS_NUMBER',
  FetchedBartlettResults = 'FACTOR_ANALYSIS__FETCHED_BARTLETT_RESULTS',
  FetchedKmoResult = 'FACTOR_ANALYSIS__FETCHED_KMO_RESULT',
  AnalysisFinished = 'FACTOR_ANALYSIS__ANALYSIS_FINISHED',
  FetchedDefaultHints = 'FACTOR_ANALYSIS__FETCHED_DEFAULT_HINTS',

  NewTab = 'FACTOR_ANALYSIS__NEW_TAB',
  ChangeCurrentTab = 'FACTOR_ANALYSIS__CHANGE_TAB',
  RemoveTab = 'FACTOR_ANALYSIS__REMOVE_TAB',
  ChangeTabFactorsCount = 'FACTOR_ANALYSIS__CHANGE_TAB_FACTORS_COUNT',
  ChangeTabRotationMethod = 'FACTOR_ANALYSIS__CHANGE_TAB_ROTATION_METHOD',
  ChangeTabLoadings = 'FACTOR_ANALYSIS__CHANGE_TAB_LOADINGS',
  TabAnalysisFinished = 'FACTOR_ANALYSIS__TAB_ANALYSIS_FINISHED',
  ExportDataframeSuccess = 'FACTOR_ANALYSIS__EXPORT_DATAFRAME_SUCCESS',
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
  eigenvalues: IBasicDataFrame;
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

interface JumpToStep {
  type: ActionType.JumpToStep;
  payload: number;
}

interface NewTab {
  type: ActionType.NewTab;
}

interface ChangeTabFactorsCount {
  type: ActionType.ChangeTabFactorsCount;
  payload: {
    count: number;
    index: number;
  };
}

interface ExportDataframeSuccess {
  type: ActionType.ExportDataframeSuccess;
}

export type RotationMethod =
  | 'none'
  | 'varimax'
  | 'promax'
  | 'oblimin'
  | 'oblimax'
  | 'quartimin'
  | 'quartimax'
  | 'equamax'
  | 'geomin_obl'
  | 'geomin_ort';
interface ChangeTabRotationMethod {
  type: ActionType.ChangeTabRotationMethod;
  payload: {
    method: RotationMethod;
    index: number;
  };
}

export interface IFactorLoadings {
  imagePath: string;
  data: IBasicDataFrame;
}
interface ChangeTabLoadings {
  type: ActionType.ChangeTabLoadings;
  payload: {
    loadings: IFactorLoadings;
    index: number;
  };
}

interface RemoveTab {
  type: ActionType.RemoveTab;
  payload: number;
}

interface ChangeCurrentTab {
  type: ActionType.ChangeCurrentTab;
  payload: number;
}

interface TabAnalysisFinished {
  type: ActionType.TabAnalysisFinished;
  payload: {
    loadings: IFactorLoadings;
    index: number;
  };
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
  | Reset
  | JumpToStep
  | NewTab
  | ChangeTabFactorsCount
  | ChangeTabRotationMethod
  | ChangeTabLoadings
  | RemoveTab
  | ChangeCurrentTab
  | TabAnalysisFinished
  | ExportDataframeSuccess;

export type Dispatch = ReduxDispatch<DispatchTypes>;
