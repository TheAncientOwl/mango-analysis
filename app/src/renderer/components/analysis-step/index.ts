export { AnalysisStep } from './AnalysisStep';
export { AnalysisStepLogic } from './AnalysisStepLogic';
export { AnalysisStepResult } from './AnalysisStepResult';
export { mapConfigToSteps } from './mapConfigToSteps';

export interface StepConfig {
  index: number;
  title: string;
  content: React.ReactNode;
  onNext?: () => void;
  onPrev?: () => void;
}
