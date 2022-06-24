import { ActionType, DispatchTypes, ICorrespondenceAnalysisResult } from './types';

import {
  IDefaultAnalysisStep,
  loading,
  nextStep,
  prevStep,
  unlockNextStep,
  lockNextStep,
  jumpToStep,
} from '@store/IDefaultAnalysisState';

import { IRowColPlot2D, createPlot } from '@components/RowColPlot2D';

const StepsCount = 3;

interface IDefaultState extends IDefaultAnalysisStep {
  nComponents: number;
  nIter: number;
  rowsName: string;
  columnsName: string;
  result: ICorrespondenceAnalysisResult;

  plots: IRowColPlot2D[];
}

const defaultState: IDefaultState = {
  loading: false,
  currentStep: 0,
  nextStepUnlocked: new Array(StepsCount).fill(false),

  nComponents: 2,
  nIter: 10,
  rowsName: 'Rows',
  columnsName: 'Columns',

  result: {
    rowCoordinates: { columns: [], data: [], index: [] },
    columnCoordinates: { columns: [], data: [], index: [] },
    summary: { columns: [], data: [], index: [] },
    totalInertia: undefined,
  },

  plots: [createPlot()],
};

export const correspondenceAnalysisReducer = (
  state: IDefaultState = defaultState,
  action: DispatchTypes
): IDefaultState => {
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

    case ActionType.ChangeComponentsN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nComponents: action.payload,
      };
    }

    case ActionType.ChangeIterN: {
      if (action.payload < 1) return state;

      return {
        ...state,
        nIter: action.payload,
      };
    }

    case ActionType.ChangeRowsName: {
      return {
        ...state,
        rowsName: action.payload,
      };
    }

    case ActionType.ChangeColumnsName: {
      return {
        ...state,
        columnsName: action.payload,
      };
    }

    case ActionType.AnalysisFinished: {
      const newSteps = [...state.nextStepUnlocked];
      newSteps.fill(true);

      return {
        ...state,
        loading: false,
        currentStep: 1,
        nextStepUnlocked: newSteps,
        result: action.payload,
      };
    }

    case ActionType.PushDefaultPlot: {
      const newPlots: IRowColPlot2D[] = [...state.plots, createPlot()];

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotComponentX: {
      const { index, value } = action.payload;

      if (state.plots[index].xComponent === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], xComponent: value };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotComponentY: {
      const { index, value } = action.payload;

      if (state.plots[index].yComponent === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], yComponent: value };

      return {
        ...state,
        plots: newPlots,
      };
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

    case ActionType.TogglePlotRowLabels: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], showRowLabels: !newPlots[index].showRowLabels };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.TogglePlotColLabels: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], showColLabels: !newPlots[index].showColLabels };

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

    default: {
      return state;
    }
  }
};
