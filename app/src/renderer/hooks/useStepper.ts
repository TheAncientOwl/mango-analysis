import React from 'react';

export const useStepper = (stepsCount: number) => {
  const [step, setStep] = React.useState(1);

  const nextStep = () => {
    if (step + 1 <= stepsCount) setStep(step + 1);
  };

  const prevStep = () => {
    if (step - 1 > 0) setStep(step - 1);
  };

  return { step, nextStep, prevStep };
};
