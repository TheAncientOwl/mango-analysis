import { IFactorLoadings, BartlettTest, ActionType, DispatchTypes, DefaultHints, RotationMethod } from './types';
import { v4 as uuidv4 } from 'uuid';

import {
  IDefaultAnalysisStep,
  newNextStepUnlockedArray,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

import { StepsID } from '@modules/factor-analysis/steps';

const StepsCountFactorAnalysis = 4;

interface IFactorAnalysisTab {
  id: string;
  factorsCount: number;
  rotationMethod: RotationMethod;
  loadings: IFactorLoadings;
}

const makeNewTab = (): IFactorAnalysisTab => {
  return {
    id: uuidv4(),
    rotationMethod: 'none',
    factorsCount: 2,
    loadings: {
      imagePath: '',
      data: {
        index: [],
        columns: [],
        data: [],
      },
    },
  };
};

interface IDefaultState extends IDefaultAnalysisStep {
  possibleFeatures: string[];
  features: string[];

  kmoModel: number;
  bartlett: BartlettTest;

  factorsNumber: number;

  defaultHints: DefaultHints;

  analysisTabs: IFactorAnalysisTab[];
  currentTab: number;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCountFactorAnalysis).fill(false),

  possibleFeatures: [],
  features: [],

  factorsNumber: 2,

  kmoModel: undefined,
  bartlett: {
    chiSquare: undefined,
    pValue: undefined,
  },

  defaultHints: {
    eigenvalues: { columns: [], data: [], index: [] },
    screePlotSrc: '',
  },

  analysisTabs: [makeNewTab()],
  currentTab: 0,
};

export const factorAnalysisReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      return loading(state) as IDefaultState;
    }

    case ActionType.NextStep: {
      return nextStep(state, StepsCountFactorAnalysis) as IDefaultState;
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

    case ActionType.FetchedPossibleFeatures: {
      return {
        ...state,
        loading: false,
        possibleFeatures: action.payload,
      };
    }

    case ActionType.ChangeFeatures: {
      return {
        ...state,
        features: action.payload,
      };
    }

    case ActionType.ChangeFactorsNumber: {
      return {
        ...state,
        factorsNumber: action.payload,
      };
    }

    case ActionType.FetchedBartlettResults: {
      return {
        ...state,
        loading: false,
        bartlett: action.payload,
      };
    }

    case ActionType.FetchedKmoResult: {
      return {
        ...state,
        loading: false,
        kmoModel: action.payload,
      };
    }

    case ActionType.AnalysisFinished: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.FetchedDefaultHints: {
      return {
        ...state,
        loading: false,
        defaultHints: action.payload,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, StepsID.DefaultFactorAnalysis, true),
      };
    }

    case ActionType.ServerSetFeaturesSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.NewTab: {
      const newTabs = [...state.analysisTabs, makeNewTab()];

      return {
        ...state,
        analysisTabs: newTabs,
      };
    }

    case ActionType.ChangeTabFactorsCount: {
      const newTabs = [...state.analysisTabs];
      const { index, count } = action.payload;
      newTabs[index] = { ...newTabs[index], factorsCount: count };

      return {
        ...state,
        analysisTabs: newTabs,
      };
    }

    case ActionType.ChangeTabRotationMethod: {
      const newTabs = [...state.analysisTabs];
      const { index, method } = action.payload;
      newTabs[index] = { ...newTabs[index], rotationMethod: method };

      return {
        ...state,
        analysisTabs: newTabs,
      };
    }

    case ActionType.ChangeTabLoadings: {
      const newTabs = [...state.analysisTabs];
      const { index, loadings } = action.payload;
      newTabs[index] = { ...newTabs[index], loadings };

      return {
        ...state,
        analysisTabs: newTabs,
      };
    }

    case ActionType.RemoveTab: {
      if (state.analysisTabs.length === 1) return state;

      const index = action.payload;
      const newTabs = [...state.analysisTabs];
      newTabs.splice(index, 1);

      return {
        ...state,
        analysisTabs: newTabs,
        currentTab: Math.max(0, state.currentTab - 1),
      };
    }

    case ActionType.ChangeCurrentTab: {
      return {
        ...state,
        currentTab: action.payload,
      };
    }

    case ActionType.TabAnalysisFinished: {
      const newTabs = [...state.analysisTabs];
      const { loadings, index } = action.payload;
      newTabs[index] = { ...newTabs[index], loadings };

      return {
        ...state,
        loading: false,
        analysisTabs: newTabs,
      };
    }

    case ActionType.ExportDataframeSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.Reset: {
      return defaultState;
    }

    default: {
      return state;
    }
  }
};
