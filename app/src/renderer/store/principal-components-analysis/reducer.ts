import { v4 as uuidv4 } from 'uuid';

import { ComponentsID } from '@modules/principal-components-analysis/config/componentsID';
import { IPlot2D } from '@modules/principal-components-analysis/components/Plot2D';

import { AnalysisHints, PossibleTF, ActionType, DispatchTypes } from './types';

const StepsCountPCA = 6;

interface IDefaultState {
  loading: boolean;

  currentStep: number;
  nextStepUnlocked: boolean[];

  target: string;
  features: string[];

  analysisComponentsCount: number;
  analysisHints: AnalysisHints;

  correlationMatrixPath: string;
  loadingsMatrixPath: string;

  plot: {
    pcaLabels: string[];
    targets: string[];
  };
  plots: IPlot2D[];

  possible: PossibleTF;
}

const defaultState: IDefaultState = {
  loading: false,

  currentStep: 0,
  nextStepUnlocked: new Array(StepsCountPCA).fill(false),

  target: '',
  features: [],

  analysisComponentsCount: 2,
  analysisHints: {
    kaiserPath: '',
    threshold70: { columns: [], data: [], index: [] },
    eigenvaluesG1: { columns: [], data: [], index: [] },
  },

  correlationMatrixPath: '',
  loadingsMatrixPath: '',

  plot: {
    pcaLabels: [],
    targets: [],
  },
  plots: [],

  possible: {
    targets: [],
    features: [],
  },
};

const newNextStepUnlockedArray = (old: boolean[], position: number, value: boolean) => {
  const newArray = [...old];
  newArray[position] = value;

  return newArray;
};

export const principalComponentsAnalysisReducer = (
  state: IDefaultState = defaultState,
  action: DispatchTypes
): IDefaultState => {
  switch (action.type) {
    case ActionType.Loading: {
      if (state.loading) return state;

      return {
        ...state,
        loading: true,
      };
    }

    case ActionType.NextStep: {
      return {
        ...state,
        currentStep: Math.min(StepsCountPCA, state.currentStep + 1),
      };
    }

    case ActionType.PrevStep: {
      return {
        ...state,
        currentStep: Math.max(0, state.currentStep - 1),
      };
    }

    case ActionType.UnlockNextStep: {
      if (state.nextStepUnlocked[action.payload]) return state;

      return {
        ...state,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, action.payload, true),
      };
    }

    case ActionType.LockNextStep: {
      if (!state.nextStepUnlocked[action.payload]) return state;

      return {
        ...state,
        nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, action.payload, false),
      };
    }

    case ActionType.FetchedPossibleTargetsFeatures: {
      return {
        ...state,
        loading: false,
        possible: action.payload,
      };
    }

    case ActionType.ChangeTarget: {
      // features not set ? old unlockedSteps : new set with next step unlocked
      const getSteps = () =>
        state.features.length < 2
          ? state.nextStepUnlocked
          : newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.TargetAndFeaturesPicker, true);

      return {
        ...state,
        target: action.payload,
        nextStepUnlocked: getSteps(),
        correlationMatrixPath: '',
      };
    }

    case ActionType.ChangeFeatures: {
      // target not set ? old unlockedSteps : new set with next step unlocked
      const getSteps = () =>
        state.target === ''
          ? state.nextStepUnlocked
          : newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.TargetAndFeaturesPicker, true);

      return {
        ...state,
        features: action.payload,
        nextStepUnlocked: getSteps(),
        correlationMatrixPath: '',
        // scaledData: false,
      };
    }

    case ActionType.ServerSetTargetFeaturesSuccess: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.JumpToStep: {
      const step = action.payload;

      const newSteps = new Array(StepsCountPCA).fill(false);
      newSteps.fill(true, 0, step);

      return {
        ...state,
        currentStep: step,
        nextStepUnlocked: newSteps,
      };
    }

    case ActionType.FetchedCorrelationMatrixPath: {
      const newSteps = newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.CorrelationMatrix, true);

      return {
        ...state,
        loading: false,
        correlationMatrixPath: action.payload,
        nextStepUnlocked: newSteps,
      };
    }

    case ActionType.FetchedAnalysisHints: {
      return {
        ...state,
        loading: false,
        analysisHints: action.payload,
      };
    }

    case ActionType.ChangeComponentsCount: {
      if (action.payload === state.analysisComponentsCount) return state;

      const newSteps = new Array(StepsCountPCA).fill(false);
      newSteps.fill(true, 0, ComponentsID.ComponentsCountPicker);

      return {
        ...state,
        analysisComponentsCount: action.payload,
        nextStepUnlocked: newSteps,
        loadingsMatrixPath: '',
        plots: [],
      };
    }

    case ActionType.AnalysisFinished: {
      const newSteps = newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.ComponentsCountPicker, true);

      return {
        ...state,
        loading: false,
        nextStepUnlocked: newSteps,
      };
    }

    case ActionType.FetchedLoadingsMatrixPath: {
      const newSteps = newNextStepUnlockedArray(state.nextStepUnlocked, ComponentsID.LoadingsMatrix, true);

      return {
        ...state,
        loading: false,
        loadingsMatrixPath: action.payload,
        nextStepUnlocked: newSteps,
      };
    }

    case ActionType.FetchedLabelsTargetsPCA: {
      const { targets, labels } = action.payload;

      return {
        ...state,
        loading: false,
        plot: {
          targets: targets,
          pcaLabels: labels,
        },
      };
    }

    case ActionType.PushDefaultPlot: {
      const newPlots: IPlot2D[] = [
        ...state.plots,
        {
          id: uuidv4(),
          pcX: '',
          pcY: '',
          plotSrc: '',
          annot: false,
          legend: false,
          targets: [],
          open: true,
          title: '',
        },
      ];

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotAxisX: {
      const { index, value } = action.payload;

      if (state.plots[index].pcX === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], pcX: value };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotAxisY: {
      const { index, value } = action.payload;

      if (state.plots[index].pcY === value) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], pcY: value };

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

    case ActionType.ClearPlots: {
      return {
        ...state,
        plots: [],
      };
    }

    case ActionType.TogglePlotAnnot: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], annot: !newPlots[index].annot };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.TogglePlotLegend: {
      const index = action.payload;
      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], legend: !newPlots[index].legend };

      return {
        ...state,
        plots: newPlots,
      };
    }

    case ActionType.ChangePlotTargets: {
      const { index, targets } = action.payload;

      if (JSON.stringify(state.plots[index].targets) === JSON.stringify(targets)) return state;

      const newPlots = [...state.plots];
      newPlots[index] = { ...newPlots[index], targets: targets };

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

    case ActionType.ExportLoadingsEnded: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    // TODO: add message on fail
    case ActionType.ExportLoadingsFail: {
      return {
        ...state,
        loading: false,
      };
    }

    case ActionType.ExportPCAEnded: {
      if (!state.loading) return state;

      return {
        ...state,
        loading: false,
      };
    }

    // TODO: add message on fail
    case ActionType.ExportPCAFail: {
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
