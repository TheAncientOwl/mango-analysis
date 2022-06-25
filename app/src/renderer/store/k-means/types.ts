// eslint-disable-next-line import/named
import { Dispatch as ReduxDispatch } from 'redux';

import { IBasicDataFrame } from '@components/BasicDataFrame';

export enum ActionType {
  Loading = 'K_MEANS__LOADING',
  Reset = 'K_MEANS__RESET',

  NextStep = 'K_MEANS__NEXT_STEP',
  PrevStep = 'K_MEANS__PREV_STEP',
  UnlockNextStep = 'K_MEANS__UNLOCK_NEXT_STEP',
  LockNextStep = 'K_MEANS__LOCK_NEXT_STEP',
  JumpToStep = 'K_MEANS__JUMP_TO_STEP',

  ChangeLabel = 'K_MEANS__CHANGE_LABEL',
  ChangeFeatures = 'K_MEANS__CHANGE_FEATURES',
  FetchedPossibleLabelsFeatures = 'K_MEANS__FETCHED_POSSIBLE_LABELS_FEATURES',
  SetLabelAndFeaturesSuccess = 'K_MEANS__SET_LABEL_AND_FEATURES_SUCCESS',
  ChangeInit = 'K_MEANS__CHANGE_INIT',
  ChangeNInit = 'K_MEANS__CHANGE_N_INIT',
  ChangeMaxIter = 'K_MEANS__CHANGE_MAX_ITER',
  ChangeRandomState = 'K_MEANS__CHANGE_RANDOM_STATE',
  ChangeClusterN = 'K_MEANS__CHANGE_CLUSTER_N',
  FetchedElbowSrc = 'K_MEANS__FETCHED_ELBOW_SRC',
  FetchedSilhouetteSrc = 'K_MEANS__FETCHED_SILHOUETTE_SRC',
  FetchedClusters = 'K_MEANS__FETCHED_CLUSTERS',
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

interface ChangeLabel {
  type: ActionType.ChangeLabel;
  payload: string;
}

interface ChangeFeatures {
  type: ActionType.ChangeFeatures;
  payload: string[];
}

interface FetchedPossibleLabelsFeatures {
  type: ActionType.FetchedPossibleLabelsFeatures;
  payload: {
    labels: string[];
    features: string[];
  };
}

export type KMeansInit = 'k-means++' | 'random';
interface ChangeInit {
  type: ActionType.ChangeInit;
  payload: KMeansInit;
}

interface ChangeNInit {
  type: ActionType.ChangeNInit;
  payload: number;
}

interface ChangeMaxIter {
  type: ActionType.ChangeMaxIter;
  payload: number;
}

interface ChangeRandomState {
  type: ActionType.ChangeRandomState;
  payload: number;
}

interface ChangeClusterN {
  type: ActionType.ChangeClusterN;
  payload: number;
}

interface FetchedElbowSrc {
  type: ActionType.FetchedElbowSrc;
  payload: string;
}

interface FetchedSilhouetteSrc {
  type: ActionType.FetchedSilhouetteSrc;
  payload: string;
}

export interface IKMeansClusters {
  inertia: number;
  nIter: number;
  clusterCenters: IBasicDataFrame;
  clusters: IBasicDataFrame;
}
interface FetchedClusters {
  type: ActionType.FetchedClusters;
  payload: IKMeansClusters;
}

interface SetLabelAndFeaturesSuccess {
  type: ActionType.SetLabelAndFeaturesSuccess;
}

export type DispatchTypes =
  | Loading
  | Reset
  | NextStep
  | PrevStep
  | UnlockNextStep
  | LockNextStep
  | JumpToStep
  | ChangeLabel
  | ChangeFeatures
  | ChangeInit
  | ChangeMaxIter
  | ChangeClusterN
  | ChangeNInit
  | ChangeRandomState
  | FetchedElbowSrc
  | FetchedSilhouetteSrc
  | FetchedClusters
  | FetchedPossibleLabelsFeatures
  | SetLabelAndFeaturesSuccess;

export type Dispatch = ReduxDispatch<DispatchTypes>;
