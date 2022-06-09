import React from 'react';

import { Tabs as MuiTabs, Tab, Box } from '@mui/material';

import { TabPanel } from './TabPanel';

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

export interface ITab {
  id: string;
  element: React.ReactNode;
  label: string;
}

interface Props {
  tabs: ITab[];
  currentTab: number;
  onCurrentTabChange: (value: number) => void;
}

export const Tabs: React.FC<Props> = ({ tabs, currentTab, onCurrentTabChange }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onCurrentTabChange(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <MuiTabs
          value={currentTab}
          onChange={handleChange}
          aria-label='tabs'
          variant='scrollable'
          scrollButtons='auto'
          allowScrollButtonsMobile={true}>
          {tabs.map((tab, index) => (
            <Tab key={tab.id} label={tab.label} {...a11yProps(index)} />
          ))}
        </MuiTabs>
      </Box>

      {tabs.map((tab, index) => (
        <TabPanel key={tab.id} value={currentTab} index={index}>
          {tab.element}
        </TabPanel>
      ))}
    </Box>
  );
};
