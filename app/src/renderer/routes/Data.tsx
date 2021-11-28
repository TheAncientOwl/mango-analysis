import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';

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
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
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
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label='data tabs'>
          <Tab label='Import' {...a11yProps(0)} />
          <Tab label='Export' {...a11yProps(1)} />
          <Tab label='Edit' {...a11yProps(2)} />
          <Tab label='View' {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          &gt; Import
        </TabPanel>
        <TabPanel value={value} index={1}>
          &gt; Export
        </TabPanel>
        <TabPanel value={value} index={2}>
          &gt; Edit
        </TabPanel>
        <TabPanel value={value} index={3}>
          &gt; View
        </TabPanel>
      </Box>
    </Box>
  );
};
