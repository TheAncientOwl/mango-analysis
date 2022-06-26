import { ActionType, DispatchTypes } from './types';

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

import { createPlot, IPlot2D } from '@modules/som/steps/Plot2D';

const StepsCount = 2;

interface IDefaultState extends IDefaultAnalysisStep {
  possibleFeatures: string[];
  target: string;
  features: string[];
  plots: IPlot2D[];
  m: number;
  n: number;
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  possibleFeatures: [],
  target: '',
  features: [],
  plots: [createPlot()],
  m: 3,
  n: 1,
};

export const somReducer = (state: IDefaultState = defaultState, action: DispatchTypes): IDefaultState => {
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

    case ActionType.FetchedPlotSrc: {
      const { index, value } = action.payload;

      if (state.plots[index].plotSrc === value)
        return {
          ...state,
          loading: false,
        };

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], plotSrc: value };

      return {
        ...state,
        loading: false,
        plots: newPlots,
      };
    }

    case ActionType.FetchedPlotSrcOriginal: {
      const { index, value } = action.payload;

      if (state.plots[index].originalSrc === value)
        return {
          ...state,
          loading: false,
        };

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], originalSrc: value };

      return {
        ...state,
        loading: false,
        plots: newPlots,
      };
    }

    case ActionType.FetchedPossibleFeatures: {
      return {
        ...state,
        loading: false,
        possibleFeatures: action.payload,
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

    case ActionType.PushDefaultPlot: {
      const newPlots: IPlot2D[] = [...state.plots, createPlot()];

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotAxisX: {
      const { index, value } = action.payload;

      if (state.plots[index].xFeature === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], xFeature: value };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotAxisY: {
      const { index, value } = action.payload;

      if (state.plots[index].yFeature === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], yFeature: value };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.TogglePlotOriginal: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], plotOriginal: !newPlots[index].plotOriginal };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.TogglePlotOpen: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], open: !newPlots[index].open };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.DeletePlot: {
      if (state.plots.length === 1) return state;

      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots.splice(index, 1);

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotTitle: {
      const { index, value } = action.payload;

      if (state.plots[index].title === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], title: value };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ModelFinished: {
      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, 0, true),
      };
    }

    case ActionType.ChangeM: {
      return {
        ...state,
        m: action.payload,
      };
    }

    case ActionType.ChangeN: {
      return {
        ...state,
        n: action.payload,
      };
    }

    case ActionType.SetServerFeaturesTargetSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    default: {
      return state;
    }
  }
};
