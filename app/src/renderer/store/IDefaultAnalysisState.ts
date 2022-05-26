export interface IDefaultAnalysisStep {
  loading: boolean;

  currentStep: number;
  nextStepUnlocked: boolean[];
}

// helper functions
export const newNextStepUnlockedArray = (old: boolean[], position: number, value: boolean) => {
  const newArray = [...old];
  newArray[position] = value;

  return newArray;
};

export const loading = (state: IDefaultAnalysisStep): IDefaultAnalysisStep => {
  if (state.loading) return state;

  return {
    ...state,
    loading: true,
  };
};

export const nextStep = (state: IDefaultAnalysisStep, stepsCount: number): IDefaultAnalysisStep => {
  return {
    ...state,
    currentStep: Math.min(stepsCount, state.currentStep + 1),
  };
};

export const prevStep = (state: IDefaultAnalysisStep): IDefaultAnalysisStep => {
  return {
    ...state,
    currentStep: Math.max(0, state.currentStep - 1),
  };
};

export const unlockNextStep = (state: IDefaultAnalysisStep, step: number): IDefaultAnalysisStep => {
  if (state.nextStepUnlocked[step]) return state;

  return {
    ...state,
    nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, step, true),
  };
};

export const lockNextStep = (state: IDefaultAnalysisStep, step: number): IDefaultAnalysisStep => {
  if (!state.nextStepUnlocked[step]) return state;

  return {
    ...state,
    nextStepUnlocked: newNextStepUnlockedArray(state.nextStepUnlocked, step, false),
  };
};

export const jumpToStep = (state: IDefaultAnalysisStep, step: number): IDefaultAnalysisStep => {
  const newNextStepUnlocked = new Array(state.nextStepUnlocked.length);
  newNextStepUnlocked.fill(true, 0, step);

  return {
    ...state,
    currentStep: step,
    nextStepUnlocked: newNextStepUnlocked,
  };
};
