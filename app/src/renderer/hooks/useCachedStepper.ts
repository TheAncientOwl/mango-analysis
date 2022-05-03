import { useCache } from './useCache';

export const useCachedStepper = (key: string, stepsCount: number) => {
  const [step, setStep] = useCache(key, 1);

  const nextStep = () => {
    if (step + 1 <= stepsCount) setStep(step + 1);
  };

  const prevStep = () => {
    if (step - 1 > 0) setStep(step - 1);
  };

  return { step, nextStep, prevStep };
};
