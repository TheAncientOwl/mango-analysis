import { ActionType, DispatchTypes, IModelKNN } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
  newNextStepUnlockedArray,
} from '@store/IDefaultAnalysisState';

const StepsCount = 4;

interface IDefaultState extends IDefaultAnalysisStep {
  possbileFeatures: string[];
  target: string;
  features: string[];
  nNeighbors: number;
  predictionModelName: string;
  valuesToPredict: number[];
  prediction: number | undefined;
  testSize: number;
  randomState: number;

  arbitraryModel: IModelKNN | undefined;
  gridModel: IModelKNN | undefined;
  gridModelWeights: IModelKNN | undefined;
  baggedModel: IModelKNN | undefined;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  possbileFeatures: [],
  target: '',
  features: [],
  nNeighbors: 4,
  predictionModelName: '',
  valuesToPredict: [],
  prediction: undefined,
  testSize: 20,
  randomState: 42,

  arbitraryModel: undefined,
  gridModel: undefined,
  gridModelWeights: undefined,
  baggedModel: undefined,
};

export const knnReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
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

    case ActionType.FetchedPossibleFeatures: {
      return {
        ...state,
        loading: false,
        possbileFeatures: action.payload,
      };
    }

    case ActionType.ChangeTarget: {
      return {
        ...state,
        target: action.payload,
      };
    }

    case ActionType.ChangeFeatures: {
      return {
        ...state,
        features: action.payload,
      };
    }

    case ActionType.ChangeTestSize: {
      return {
        ...state,
        testSize: action.payload,
      };
    }

    case ActionType.ChangeRandomState: {
      return {
        ...state,
        randomState: action.payload,
      };
    }

    case ActionType.ChangeNeighborsN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nNeighbors: action.payload,
      };
    }

    case ActionType.ChangedPredictionModelSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeValuesToPredict: {
      return {
        ...state,
        valuesToPredict: action.payload,
      };
    }

    case ActionType.FetchedPrediction: {
      return {
        ...state,
        loading: false,
        prediction: action.payload,
      };
    }

    case ActionType.SetServerFeaturesTargetSuccess: {
      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 0, true),
      };
    }

    case ActionType.FetchedArbitraryModel: {
      return {
        ...state,
        loading: false,
        arbitraryModel: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 1, true),
      };
    }

    case ActionType.FetchedGridModel: {
      return {
        ...state,
        loading: false,
        gridModel: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 1, true),
      };
    }

    case ActionType.FetchedGridWeightsModel: {
      return {
        ...state,
        loading: false,
        gridModelWeights: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 1, true),
      };
    }

    case ActionType.FetchedBaggedModel: {
      return {
        ...state,
        loading: false,
        baggedModel: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 1, true),
      };
    }

    case ActionType.ResetModels: {
      return {
        ...state,
        arbitraryModel: undefined,
        gridModel: undefined,
        gridModelWeights: undefined,
        baggedModel: undefined,
        nextStepUnlocked: new Array(state.nextStepUnlocked.length).fill(false),
      };
    }

    default: {
      return state;
    }
  }
};
