import React, { useState } from 'react';

import { Tabs, Tab, Box } from '@mui/material';

import { TabsConfig } from './TabsConfig';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`data-tabpanel-${index}`}
      aria-labelledby={`data-tabpanel-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
};

const a11yProps = (index: number) => {
  return {
    id: `data-tabpanel-${index}`,
    'aria-controls': `data-tabpanel-${index}`,
  };
};

export const Data: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => setValue(newValue);

  return (
    <Box sx={{}}>
      <Tabs value={value} onChange={handleChange} aria-label='data tabs'>
        {TabsConfig.map((tab, index) => (
          <Tab key={index} icon={tab.icon} iconPosition='start' label={tab.label} {...a11yProps(index)} />
        ))}
      </Tabs>

      {TabsConfig.map((tab, index) => (
        <TabPanel key={index} value={value} index={index}>
          {tab.component}
        </TabPanel>
      ))}
    </Box>
  );
};
