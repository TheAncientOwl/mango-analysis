import React from 'react';
import { PrincipalComponentsAnalysisState } from './state';
import { PCA } from './index';
import { CacheSystem } from '@renderer/api/CacheSystem';

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',

  ChangeTarget = 'CHANGE_TARGET',
  SetFeatures = 'SET_FEATURES',

  SetSelectedComponentsCount = 'SET_SELECTED_COMPONENTS_COUNT',
  SetCorrelationMatrixPath = 'SET_CORRELATION_MATRIX_PATH',
  SetLoadingsMatrixPath = 'SET_LOADINGS_MATRIX_PATH',
  SetScaledData = 'SET_SCALED_DATA',

  SetUnlockedStep = 'CHANGE_CAN_STEP',
  NextStep = 'NEXT_STEP',
  PrevStep = 'PREV_STEP',
}

interface StepConfig {
  index: number;
  allowed: boolean;
}

interface Action {
  type: ActionType;
  payload?: string | string[] | boolean | number | StepConfig;
}

export type PCA_Dispatcher = React.Dispatch<Action>;

export const reducer = (state: PrincipalComponentsAnalysisState, action: Action): PrincipalComponentsAnalysisState => {
  switch (action.type) {
    case ActionType.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.EndLoading: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ChangeTarget: {
      CacheSystem.SetItem(PCA.CacheKeys.Target, action.payload);

      return {
        ...state,
        target: action.payload as string,
      };
    }

    case ActionType.SetFeatures: {
      const newFeatures = action.payload as string[];

      CacheSystem.SetItem(PCA.CacheKeys.Features, newFeatures);

      return {
        ...state,
        features: newFeatures,
      };
    }

    case ActionType.SetSelectedComponentsCount: {
      CacheSystem.SetItem(PCA.CacheKeys.ComponentsCount, action.payload as number);

      return {
        ...state,
        selectedComponentsCount: action.payload as number,
      };
    }

    case ActionType.SetCorrelationMatrixPath: {
      CacheSystem.SetItem(PCA.CacheKeys.CorrelationMatrixPath, action.payload as string);

      return {
        ...state,
        correlationMatrixPath: action.payload as string,
      };
    }

    case ActionType.SetLoadingsMatrixPath: {
      CacheSystem.SetItem(PCA.CacheKeys.LoadingsMatrixPath, action.payload as string);

      return {
        ...state,
        loadingsMatrixPath: action.payload as string,
      };
    }

    case ActionType.SetScaledData: {
      CacheSystem.SetItem(PCA.CacheKeys.ScaledData, action.payload as boolean);

      return {
        ...state,
        scaledData: action.payload as boolean,
      };
    }

    case ActionType.SetUnlockedStep: {
      const config = action.payload as StepConfig;

      if (state.unlockedSteps[config.index] === config.allowed) return state;

      const newSteps = [...state.unlockedSteps];
      newSteps[config.index] = config.allowed;

      CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);

      return {
        ...state,
        unlockedSteps: newSteps,
      };
    }

    case ActionType.NextStep: {
      CacheSystem.SetItem(PCA.CacheKeys.CurrentStep, state.currentStep + 1);

      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }

    case ActionType.PrevStep: {
      CacheSystem.SetItem(PCA.CacheKeys.CurrentStep, state.currentStep - 1);

      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }

    default: {
      throw 'Action type not implemented! (PCA)';
    }
  }
};
