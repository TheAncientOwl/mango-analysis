import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  changeComponentsCount,
  runAnalysis,
  exportPCA,
  toggleHints,
} from '@store/principal-components-analysis/actions';

// eslint-disable-next-line import/named
import { Box, Button, Collapse, Grid, SelectChangeEvent, Stack, Typography } from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

import { AnalysisStepLogic, AnalysisStepResult } from '@components/analysis-step';
import { BasicDataFrame } from '@components/BasicDataFrame';
import { AnalysisImage } from '@components/AnalysisImage';
import { Paper } from '@components/Paper';
import { Select } from '@components/Select';

import { ComponentsID } from '../config/componentsID';

const ComponentsCountPicker: React.FC<PropsFromRedux> = props => {
  const handleChange = (event: SelectChangeEvent) => {
    props.changeComponentsCount(+event.target.value);
  };

  const componentsCountOptions = React.useMemo(() => {
    const options = new Array(Math.max(0, props.featuresLength)).fill(0);

    options.forEach((element, index, array) => {
      array[index] = index + 2;
    });

    return options;
  }, [props.featuresLength]);

  const runAnalysis = () => {
    props.runAnalysis(props.componentsCount);
  };

  return (
    <React.Fragment>
      <AnalysisStepLogic>
        <Stack mt={1} ml={1} direction='row' gap={1}>
          <Select
            minWidth='7em'
            id='components-count-picker'
            label='Components'
            value={props.featuresLength > 0 ? `${props.componentsCount}` : ''}
            values={componentsCountOptions}
            onChange={handleChange}
          />

          <Button onClick={runAnalysis} size='medium'>
            Run analysis
          </Button>

          <Button
            startIcon={props.hintsOpen ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            onClick={props.toggleHints}
            size='medium'>
            Hints
          </Button>

          {props.showExportPCA && (
            <Button size='medium' onClick={props.exportPCA}>
              export pca data
            </Button>
          )}
        </Stack>
      </AnalysisStepLogic>

      <AnalysisStepResult>
        <Collapse in={props.hintsOpen}>
          {props.hints.kaiserPath !== '' && (
            <Grid container spacing={2} alignItems='center' sx={{ mt: 1 }}>
              <Grid item xs={8} sm={7} md={4}>
                <Paper>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Threshold70
                  </Typography>
                  <BasicDataFrame {...props.hints.threshold70} maxWidth='35em' />
                </Paper>
              </Grid>

              <Grid item xs={4} sm={5} md={4}>
                <Paper>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Eigenvalues &gt; 1
                  </Typography>
                  <BasicDataFrame {...props.hints.eigenvaluesG1} maxWidth='20em' />
                </Paper>
              </Grid>

              <Grid item xs={7} md={4}>
                <Paper>
                  <Typography variant='h6' sx={{ mb: 1 }}>
                    Scree Plot
                  </Typography>
                  <Box>
                    <AnalysisImage src={props.hints.kaiserPath} alt='Scree Plot ~ Kaiser' />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </Collapse>
      </AnalysisStepResult>
    </React.Fragment>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  hintsOpen: state.pca.hintsOpen,
  featuresLength: state.pca.features.length,
  componentsCount: state.pca.analysisComponentsCount,
  hints: state.pca.analysisHints,
  showExportPCA: state.pca.nextStepUnlocked[ComponentsID.ComponentsCountPicker],
});

const mapDispatch = {
  changeComponentsCount,
  runAnalysis,
  exportPCA,
  toggleHints,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ComponentsCountPicker);
// </redux>
