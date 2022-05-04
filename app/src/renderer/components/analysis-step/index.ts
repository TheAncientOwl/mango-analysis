export { AnalysisStep } from './AnalysisStep';
export { AnalysisStepLogic } from './AnalysisStepLogic';
export { AnalysisStepResult } from './AnalysisStepResult';
export { mapConfigToSteps } from './mapConfigToSteps';

export interface StepConfig<State, Dispatch> {
  index: number;
  title: string;
  content: React.ReactNode;
  onNext?: (state: State, dispatch: Dispatch) => void;
  onPrev?: (state: State, dispatch: Dispatch) => void;
}
