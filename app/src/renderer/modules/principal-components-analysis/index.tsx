import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { nextStep, prevStep } from '@store/principal-components-analysis/actions';

import { Analysis } from '@components/analysis';

import { StepsPCA } from './steps';

const PrincipalComponentsAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <Analysis
      stepsConfig={StepsPCA}
      nextStep={props.nextStep}
      prevStep={props.prevStep}
      currentStep={props.currentStep}
      unlockedSteps={props.unlockedSteps}
      loading={props.loading}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  loading: state.pca.loading,
  currentStep: state.pca.currentStep,
  unlockedSteps: state.pca.nextStepUnlocked,
});

const mapDispatch = {
  nextStep,
  prevStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(PrincipalComponentsAnalysis);
// </redux>
