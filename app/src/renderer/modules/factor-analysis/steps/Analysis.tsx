import React from 'react';

// eslint-disable-next-line import/named
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '@store/.';
import {
  newTab,
  removeTab,
  changeTabFactorsCount,
  changeTabRotationMethod,
  changeCurrentTab,
  runTabAnalysis,
  exportDataFrame,
} from '@store/factor-analysis/actions';

import { Tabs } from '@components/Tabs';

import { AxisRotation } from './AxisRotation';

import { RotationMethod } from '@store/factor-analysis/types';

const RotationOptions: RotationMethod[] = [
  'none',
  'varimax',
  'promax',
  'oblimin',
  'oblimax',
  'quartimin',
  'quartimax',
  'equamax',
  'geomin_obl',
  'geomin_ort',
];

const Analysis: React.FC<PropsFromRedux> = props => {
  const factorsOptions = React.useMemo(() => {
    const options = new Array<string>(Math.max(0, props.maxFactorsCount)).fill('');

    options.forEach((element, index, array) => {
      array[index] = `${index + 1}`;
    });

    return options;
  }, [props.maxFactorsCount]);

  return (
    <Tabs
      currentTab={props.currentTab}
      onCurrentTabChange={props.changeCurrentTab}
      tabs={props.tabs.map((tab, index) => ({
        id: tab.id,
        label: `${tab.rotationMethod}-${tab.factorsCount}`,
        element: (
          <AxisRotation
            factorsCount={`${tab.factorsCount}`}
            factorsOptions={factorsOptions}
            rotationMethod={tab.rotationMethod}
            rotationOptions={RotationOptions}
            loadings={tab.loadings}
            onFactorsChange={value => props.changeTabFactorsCount(index, value)}
            onRotationMethodChange={value => props.changeTabRotationMethod(index, value)}
            onNewTab={props.newTab}
            onRemove={() => props.removeTab(index)}
            onRun={() => props.runTabAnalysis(index)}
            onExportLoadings={props.exportDataFrame}
          />
        ),
      }))}
    />
  );
};

// <redux>
const mapState = (state: RootState) => ({
  tabs: state.factorAnalysis.analysisTabs,
  maxFactorsCount: state.factorAnalysis.features.length,
  currentTab: state.factorAnalysis.currentTab,
});

const mapDispatch = {
  newTab,
  removeTab,
  changeTabFactorsCount,
  changeTabRotationMethod,
  changeCurrentTab,
  runTabAnalysis,
  exportDataFrame,
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Analysis);
// </redux>
