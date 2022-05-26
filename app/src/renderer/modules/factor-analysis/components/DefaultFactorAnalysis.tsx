import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import { changeFactorsNumber, runDefaultAnalysis } from '@store/factor-analysis/actions';

import { Button, Collapse, Grid } from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';

import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';
import { AnalysisImage } from '@components/AnalysisImage';
import { BasicDataFrame } from '@components/BasicDataFrame';
import { Paper } from '@components/Paper';

const DefaultFactorAnalysis: React.FC<PropsFromRedux> = props => {
  return (
    <React.Fragment>
      <AnalysisStepLogic>
        <Button onClick={props.runDefaultAnalysis} startIcon={<BoltIcon />} size='medium'>
          run default analysis
        </Button>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <Collapse in={props.defaultHints.screePlotSrc !== ''}>
          <Grid container spacing={2} alignItems='flex-start' sx={{ mt: 1 }}>
            <Grid item xs={6} sm={7} md={4}>
              <Paper>
                <AnalysisImage src={props.defaultHints.screePlotSrc} alt='Scree Plot' />
              </Paper>
            </Grid>
            <Grid item xs={4} sm={5} md={4}>
              <Paper sx={{ maxHeight: '480px' }}>
                <BasicDataFrame {...props.defaultHints.eigenvalues} />
              </Paper>
            </Grid>
          </Grid>
        </Collapse>
      </AnalysisStepResult>
    </React.Fragment>
  );
};

const mapState = (state: RootState) => ({
  numberOfFeatures: state.factorAnalysis.features.length - 1,
  defaultHints: state.factorAnalysis.defaultHints,
});

const mapDispatch = {
  changeFactorsNumber,
  runDefaultAnalysis,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DefaultFactorAnalysis);
// </redux>
