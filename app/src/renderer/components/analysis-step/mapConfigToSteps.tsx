import React from 'react';

import { AnalysisStep } from './AnalysisStep';
import { StepConfig } from './index';

// mapper StepsConfig -> ReactNodes
export const mapConfigToSteps = <State, Dispatch>(
  stepsConfig: ReadonlyArray<StepConfig<State, Dispatch>>,
  nextStep: () => void,
  prevStep: () => void,
  currentStep: number,
  totalSteps: number,
  canStep: boolean[],
  state: State,
  dispatch: Dispatch
) => {
  return (
    <React.Fragment>
      {stepsConfig.map(step => (
        <AnalysisStep
          key={step.index}
          step={step.index}
          currentStep={currentStep}
          totalSteps={totalSteps}
          title={step.title}
          canNext={canStep[step.index + 1]}
          onNext={
            step.onNext
              ? () => {
                  nextStep();
                  step?.onNext?.(state, dispatch);
                }
              : nextStep
          }
          onBack={
            step.onPrev
              ? () => {
                  prevStep();
                  step?.onPrev?.(state, dispatch);
                }
              : prevStep
          }>
          {step.content}
        </AnalysisStep>
      ))}
    </React.Fragment>
  );
};
