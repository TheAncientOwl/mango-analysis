export interface IDefaultAnalysisStep {
  loading: boolean;

  currentStep: number;
  nextStepUnlocked: boolean[];
}

export const newNextStepUnlockedArray = (old: boolean[], position: number, value: boolean) => {
  const newArray = [...old];
  newArray[position] = value;

  return newArray;
};
