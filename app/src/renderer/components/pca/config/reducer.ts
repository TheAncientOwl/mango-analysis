import React from 'react';
import { cacheComponentsCountHints, ComponentsCountHints, PrincipalComponentsAnalysisState } from './state';
import { PCA } from './index';
import { CacheSystem } from '@renderer/api/CacheSystem';

export enum ActionType {
  Loading = 'LOADING',
  EndLoading = 'END_LOADING',

  ChangeTarget = 'CHANGE_TARGET',
  SetFeatures = 'SET_FEATURES',

  SetSelectedComponentsCount = 'SET_SELECTED_COMPONENTS_COUNT',
  FetchedCorrelationMatrixPath = 'FETCHED_CORRELATION_MATRIX_PATH',
  FetchedLoadingsMatrixPath = 'FETCHED_LOADINGS_MATRIX_PATH',
  FetchedScaledDataState = 'FETCHED_SCALED_DATA_STATE',
  FetchedComponentsCountHints = 'FETCHED_COMPONENTS_COUNT_HINTS',

  SetUnlockedStep = 'SET_UNLOCKED_STEP',
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
  payload?: string | string[] | boolean | number | StepConfig | ComponentsCountHints;
}

export type PCA_Dispatcher = React.Dispatch<Action>;

const newUnlockedStepArray = (old: boolean[], position: number, value: boolean) => {
  const newArray = [...old];
  newArray[position] = value;

  CacheSystem.SetItem(PCA.CacheKeys.UnlockedSteps, newArray);

  return newArray;
};

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

    // update target = payload
    // cache new target
    // update unlocked steps
    // clear correlationMatrixPath
    // invalidate scaledData
    case ActionType.ChangeTarget: {
      if (state.target === (action.payload as string)) return state;

      // features not set ? old unlockedSteps : new set with next step unlocked
      const getSteps = () =>
        state.features.length < 2
          ? state.unlockedSteps
          : newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.TargetAndFeaturesPicker + 1, true);

      CacheSystem.SetItem(PCA.CacheKeys.Target, action.payload);
      CacheSystem.SetItem(PCA.CacheKeys.CorrelationMatrixPath, '');
      CacheSystem.SetItem(PCA.CacheKeys.ScaledData, false);

      return {
        ...state,
        target: action.payload as string,
        unlockedSteps: getSteps(),
        correlationMatrixPath: '',
        scaledData: false,
      };
    }

    // update features = payload
    // cache new features
    // update unlocked steps
    // clear correlationMatrixPath
    // invalidate scaledData
    case ActionType.SetFeatures: {
      if (JSON.stringify(state.features) === JSON.stringify(action.payload as string[])) return state;

      // target not set ? old unlockedSteps : new set with next step unlocked
      const getSteps = () =>
        state.target === ''
          ? state.unlockedSteps
          : newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.TargetAndFeaturesPicker + 1, true);

      CacheSystem.SetItem(PCA.CacheKeys.Features, action.payload as string[]);
      CacheSystem.SetItem(PCA.CacheKeys.CorrelationMatrixPath, '');
      CacheSystem.SetItem(PCA.CacheKeys.ScaledData, false);

      return {
        ...state,
        features: action.payload as string[],
        unlockedSteps: getSteps(),
        correlationMatrixPath: '',
        scaledData: false,
      };
    }

    // update selectedComponentsCount = payload
    // cache new selectedComponentsCount
    // clear loadingsMatrixPath
    case ActionType.SetSelectedComponentsCount: {
      CacheSystem.SetItem(PCA.CacheKeys.ComponentsCount, action.payload as number);

      return {
        ...state,
        selectedComponentsCount: action.payload as number,
        loadingsMatrixPath: '',
      };
    }

    // update correlationMatrixPath = payload
    // cache new correlationMatrixPath
    // unlock next step
    // stop loading
    case ActionType.FetchedCorrelationMatrixPath: {
      // unlock the step after CorrelationMatrix
      const newSteps = newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.CorrelationMatrix + 1, true);

      CacheSystem.SetItem(PCA.CacheKeys.CorrelationMatrixPath, action.payload as string);

      return {
        ...state,
        correlationMatrixPath: action.payload as string,
        unlockedSteps: newSteps,
        loading: false,
      };
    }

    // update loadingsMatrixPath = payload
    // cache new loadingsMatrixPath
    // unlock next step
    // stop loading
    case ActionType.FetchedLoadingsMatrixPath: {
      // unlock the step after LoadingsMatrix
      const newSteps = newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.LoadingsMatrix + 1, true);

      CacheSystem.SetItem(PCA.CacheKeys.LoadingsMatrixPath, action.payload as string);

      return {
        ...state,
        loadingsMatrixPath: action.payload as string,
        loading: false,
        unlockedSteps: newSteps,
      };
    }

    // update scaledData = payload
    // cache new scaledData
    // jump to next step if the data is scaled
    //  update currentStep
    //  update unlockedSteps
    // stop loading
    case ActionType.FetchedScaledDataState: {
      const isDataScaled = action.payload as boolean;

      const jumpToNextStep = () => {
        if (!isDataScaled) return {};

        const newSteps = newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.ScaleHandler + 1, true);

        return {
          unlockedSteps: newSteps,
          currentStep: PCA.ComponentIndex.ScaleHandler + 1,
        };
      };

      CacheSystem.SetItem(PCA.CacheKeys.ScaledData, isDataScaled);

      return {
        ...state,
        scaledData: isDataScaled,
        loading: false,
        ...jumpToNextStep(),
      };
    }

    // update unlockedSteps = new array with *payload.allowed* at *payload.index* position
    // cache new unlockedSteps
    case ActionType.SetUnlockedStep: {
      const config = action.payload as StepConfig;

      if (state.unlockedSteps[config.index] === config.allowed) return state;

      const newSteps = newUnlockedStepArray(state.unlockedSteps, config.index, config.allowed);

      return {
        ...state,
        unlockedSteps: newSteps,
      };
    }

    // increase currentStep
    // cache new currentStep
    case ActionType.NextStep: {
      CacheSystem.SetItem(PCA.CacheKeys.CurrentStep, state.currentStep + 1);

      return {
        ...state,
        currentStep: state.currentStep + 1,
      };
    }

    // decrease currentStep
    // cache new currentStep
    case ActionType.PrevStep: {
      CacheSystem.SetItem(PCA.CacheKeys.CurrentStep, state.currentStep - 1);

      return {
        ...state,
        currentStep: state.currentStep - 1,
      };
    }

    // update currentStep = payload
    // update unlockedSteps: all allowed to currentStep (inclusive)
    case ActionType.JumpToStep: {
      const step = action.payload as number;

      const newSteps = [...state.unlockedSteps];
      newSteps.fill(true, 1, step + 1);

      CacheSystem.SetItem(PCA.CacheKeys.UnlockedSteps, newSteps);

      return {
        ...state,
        currentStep: step,
        unlockedSteps: newSteps,
      };
    }

    // jump to next step
    //  set currentStep
    //  update unlockedSteps
    // stop loading
    case ActionType.ComponentsAnalysisFinished: {
      // unlock the step after ComponentsCountPicker
      const newSteps = newUnlockedStepArray(state.unlockedSteps, PCA.ComponentIndex.ComponentsCountPicker + 1, true);

      return {
        ...state,
        currentStep: PCA.ComponentIndex.ComponentsCountPicker + 1,
        loading: false,
        unlockedSteps: newSteps,
      };
    }

    // update componentsCountHints = payload
    // cache componentsCountHints
    case ActionType.FetchedComponentsCountHints: {
      cacheComponentsCountHints(action.payload as ComponentsCountHints);

      return {
        ...state,
        loading: false,
        componentsCountHints: action.payload as ComponentsCountHints,
      };
    }

    default: {
      throw 'Action type not implemented! (PCA)';
    }
  }
};
