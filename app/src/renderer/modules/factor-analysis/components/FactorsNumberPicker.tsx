import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changeFactorsNumber, runDefaultAnalysis } from '@store/factor-analysis/actions';

// eslint-disable-next-line import/named
import { SelectChangeEvent } from '@mui/material';

import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';

const FactorsNumberPicker: React.FC<PropsFromRedux> = props => {
  const handleChange = (event: SelectChangeEvent) => {
    props.changeFactorsNumber(+event.target.value);
  };

  const menuItemsDummyArray = React.useMemo(
    () => new Array(Math.max(0, props.numberOfFeatures)).fill(0),
    [props.numberOfFeatures]
  );

  return (
    <React.Fragment>
      <AnalysisStepLogic></AnalysisStepLogic>
      <AnalysisStepResult></AnalysisStepResult>
    </React.Fragment>
  );
};

const mapState = (state: RootState) => ({
  factorsNumber: state.factorAnalysis.factorsNumber,
  numberOfFeatures: state.factorAnalysis.features.length - 1,
});

const mapDispatch = {
  changeFactorsNumber,
  runDefaultAnalysis,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(FactorsNumberPicker);
// </redux>
