import { ActionType, DispatchTypes, IKMeansClusters, KMeansInit } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

const StepsCount = 3;

interface IDefaultState extends IDefaultAnalysisStep {
  label: string;
  features: string[];
  possible: {
    labels: string[];
    features: string[];
  };

  init: KMeansInit;
  nInit: number;
  maxIter: number;
  randomState: number;
  nClusters: number;
  elbowSrc: string;
  silhouetteSrc: string;
  clusters: IKMeansClusters | undefined;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  label: '',
  features: [],
  possible: {
    labels: [],
    features: [],
  },

  init: 'k-means++',
  nInit: 4,
  maxIter: 200,
  nClusters: 4,
  randomState: 42,
  elbowSrc: '',
  silhouetteSrc: '',
  clusters: undefined,
};

export const kMeansReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCount) as IDefaultState;
    }

    case ActionType.PrevStep: {
      return prevStep(state) as IDefaultState;
    }

    case ActionType.UnlockNextStep: {
      return unlockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.LockNextStep: {
      return lockNextStep(state, action.payload) as IDefaultState;
    }

    case ActionType.JumpToStep: {
      return jumpToStep(state, action.payload) as IDefaultState;
    }

    case ActionType.Reset: {
      return defaultState;
    }

    case ActionType.ChangeLabel: {
      return {
        ...state,
        label: action.payload,
      };
    }

    case ActionType.ChangeFeatures: {
      return {
        ...state,
        features: action.payload,
      };
    }

    case ActionType.FetchedPossibleLabelsFeatures: {
      return {
        ...state,
        loading: false,
        possible: action.payload,
      };
    }

    case ActionType.ChangeInit: {
      return {
        ...state,
        init: action.payload,
      };
    }

    case ActionType.ChangeNInit: {
      return {
        ...state,
        nInit: action.payload,
      };
    }

    case ActionType.ChangeMaxIter: {
      return {
        ...state,
        maxIter: action.payload,
      };
    }

    case ActionType.ChangeRandomState: {
      return {
        ...state,
        randomState: action.payload,
      };
    }

    case ActionType.ChangeClusterN: {
      return {
        ...state,
        nClusters: action.payload,
      };
    }

    case ActionType.FetchedElbowSrc: {
      return {
        ...state,
        loading: false,
        elbowSrc: action.payload,
      };
    }

    case ActionType.FetchedSilhouetteSrc: {
      return {
        ...state,
        loading: false,
        silhouetteSrc: action.payload,
      };
    }

    case ActionType.FetchedClusters: {
      return {
        ...state,
        loading: false,
        clusters: action.payload,
      };
    }

    case ActionType.SetLabelAndFeaturesSuccess: {
      const newSteps = [...state.nextStepUnlocked];
      newSteps.fill(true);

      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newSteps,
      };
    }

    default: {
      return state;
    }
  }
};
