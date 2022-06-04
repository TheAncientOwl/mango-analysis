import React from 'react';

import { Tabs as MuiTabs, Tab, Typography, Box } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div role='tabpanel' hidden={value !== index} id={`tabpanel-${index}`} aria-labelledby={`tab-${index}`} {...other}>
    {value === index && (
      <Box sx={{ p: 3 }}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

const a11yProps = (index: number) => ({
  id: `tab-${index}`,
  'aria-controls': `tabpanel-${index}`,
});

export interface ITab {
  id: string;
  element: React.ReactNode;
  label: string;
}

interface TabsProps {
  tabs: ITab[];
  currentTab: number;
  onCurrentTabChange: (value: number) => void;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, currentTab, onCurrentTabChange }) => {
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
