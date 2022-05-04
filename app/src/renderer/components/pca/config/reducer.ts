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
  JumpToStep = 'JUMP_TO_STEP',

  ComponentsAnalysisFinished = 'COMPONENTS_ANALYSIS_FINISHED',
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
      // check if features are set
      if (state.features.length > 1) {
        // allow the step after TargetAndFeaturesPicker
        const newSteps = [...state.unlockedSteps];
        newSteps[PCA.ComponentIndex.TargetAndFeaturesPicker + 1] = true;

        // cache
        CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);
        CacheSystem.SetItem(PCA.CacheKeys.Target, action.payload);

        return {
          ...state,
          target: action.payload as string,
          unlockedSteps: newSteps,
        };
      }

      CacheSystem.SetItem(PCA.CacheKeys.Target, action.payload);

      return {
        ...state,
        target: action.payload as string,
      };
    }

    case ActionType.SetFeatures: {
      // check if target is set
      if (state.target !== '') {
        // allow the step after TargetAndFeaturesPicker
        const newSteps = [...state.unlockedSteps];
        newSteps[PCA.ComponentIndex.TargetAndFeaturesPicker + 1] = true;

        // cache
        CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);

        const newFeatures = action.payload as string[];
        CacheSystem.SetItem(PCA.CacheKeys.Features, newFeatures);

        return {
          ...state,
          features: newFeatures,
        };
      }

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
      // allow the step after CorrelationMatrix
      const newSteps = [...state.unlockedSteps];
      newSteps[PCA.ComponentIndex.CorrelationMatrix + 1] = true;

      CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);
      CacheSystem.SetItem(PCA.CacheKeys.CorrelationMatrixPath, action.payload as string);

      return {
        ...state,
        correlationMatrixPath: action.payload as string,
        unlockedSteps: newSteps,
        loading: false,
      };
    }

    case ActionType.SetLoadingsMatrixPath: {
      // allow the step after LoadingsMatrix
      const newSteps = [...state.unlockedSteps];
      newSteps[PCA.ComponentIndex.LoadingsMatrix + 1] = true;

      CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);
      CacheSystem.SetItem(PCA.CacheKeys.LoadingsMatrixPath, action.payload as string);

      return {
        ...state,
        loadingsMatrixPath: action.payload as string,
        loading: false,
        unlockedSteps: newSteps,
      };
    }

    case ActionType.SetScaledData: {
      const isDataScaled = action.payload as boolean;

      // if the data is scaled, allow the step after ScaleHandler
      if (isDataScaled) {
        const newSteps = [...state.unlockedSteps];
        newSteps[PCA.ComponentIndex.ScaleHandler + 1] = true;

        // cache
        CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);
        CacheSystem.SetItem(PCA.CacheKeys.ScaledData, isDataScaled);

        return {
          ...state,
          scaledData: isDataScaled,
          loading: false,
          unlockedSteps: newSteps,
          currentStep: PCA.ComponentIndex.ScaleHandler + 1,
        };
      }

      CacheSystem.SetItem(PCA.CacheKeys.ScaledData, isDataScaled);

      return {
        ...state,
        scaledData: isDataScaled,
        loading: false,
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

    case ActionType.JumpToStep: {
      const step = action.payload as number;

      const newSteps = [...state.unlockedSteps];
      newSteps.fill(true, 1, step + 1);

      return {
        ...state,
        currentStep: step,
      };
    }

    case ActionType.ComponentsAnalysisFinished: {
      // allow the step after ComponentsCountPicker
      const newSteps = [...state.unlockedSteps];
      newSteps[PCA.ComponentIndex.ComponentsCountPicker + 1] = true;

      CacheSystem.SetItem(PCA.CacheKeys.CanStep, newSteps);

      return {
        ...state,
        currentStep: PCA.ComponentIndex.ComponentsCountPicker + 1,
        loading: false,
        unlockedSteps: newSteps,
      };
    }

    default: {
      throw 'Action type not implemented! (PCA)';
    }
  }
};
