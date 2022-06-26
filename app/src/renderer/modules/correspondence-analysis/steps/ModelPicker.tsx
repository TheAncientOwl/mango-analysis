import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  changeComponentsN,
  changeIterN,
  changeColumnsName,
  changeRowsName,
  runAnalysis,
  lockNextStep,
} from '@store/correspondence-analysis/actions';

// eslint-disable-next-line import/named
import { Stack, SelectChangeEvent } from '@mui/material';

import { InputWithSave } from '@components/InputWithSave';
import { RunButton } from '@components/buttons';
import { AnalysisStepLogic } from '@components/analysis';

import { StepsID } from '.';
import { Select } from '@components/select';

const ModelPicker: React.FC<PropsFromRedux> = props => {
  React.useEffect(() => {
    props.lockNextStep(StepsID.ModelPicker);
  }, [props.nComponents, props.nIter, props.rowsName, props.columnsName]);

  const componentsCountOptions = React.useMemo(() => {
    const options = new Array(Math.max(0, props.maxComponentsN)).fill(0);

    options.forEach((element, index, array) => {
      array[index] = index + 1;
    });

    return options;
  }, [props.maxComponentsN]);

  const handleChange = (event: SelectChangeEvent) => {
    props.changeComponentsN(+event.target.value);
  };

  return (
    <AnalysisStepLogic>
      <Stack direction='column' gap={2} mb={2}>
        <Select
          minWidth='7em'
          maxWidth='7em'
          id='components-count-picker-ca'
          label='Components'
          value={props.maxComponentsN > 0 ? `${props.nComponents}` : ''}
          values={componentsCountOptions}
          onChange={handleChange}
        />

        <InputWithSave
          text={props.nIter}
          placeholder='Iterations Count'
          tooltip='Saved'
          tooltipUnsaved='Value not saved. Click to save. (Cannot be less than 1)'
          onSave={props.changeIterN}
          type='number'
        />

        <InputWithSave
          text={props.rowsName}
          placeholder='Rows Name'
          tooltip='Saved'
          tooltipUnsaved='Value not saved. Click to save.'
          onSave={props.changeRowsName}
        />

        <InputWithSave
          text={props.columnsName}
          placeholder='Columns Name'
          tooltip='Saved'
          tooltipUnsaved='Value not saved. Click to save.'
          onSave={props.changeColumnsName}
        />
      </Stack>

      <RunButton onClick={() => props.runAnalysis(props.nComponents, props.nIter, props.rowsName, props.columnsName)}>
        run model
      </RunButton>
    </AnalysisStepLogic>
  );
};

// <redux>
const mapState = (state: RootState) => ({
  nComponents: state.correspondenceAnalysis.nComponents,
  nIter: state.correspondenceAnalysis.nIter,
  rowsName: state.correspondenceAnalysis.rowsName,
  columnsName: state.correspondenceAnalysis.columnsName,
  maxComponentsN: state.dataManager.dataFrame.labels.length - 2,
});

const mapDispatch = {
  changeComponentsN,
  changeIterN,
  changeColumnsName,
  changeRowsName,
  runAnalysis,
  lockNextStep,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(ModelPicker);
// </redux>
