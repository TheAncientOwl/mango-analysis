import React, { useState } from 'react';

import { Tabs, Tab, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import TableViewIcon from '@mui/icons-material/TableView';

import { Import } from './Import';
import { Export } from './Export';
import { Edit } from './Edit';
import { View } from './View';

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
          <Tab icon={<FileUploadIcon />} iconPosition='start' label='Import' {...a11yProps(0)} />
          <Tab icon={<FileDownloadIcon />} iconPosition='start' label='Export' {...a11yProps(1)} />
          <Tab icon={<EditIcon />} iconPosition='start' label='Edit' {...a11yProps(2)} />
          <Tab icon={<TableViewIcon />} iconPosition='start' label='View' {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Import />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Export />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Edit />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <View />
        </TabPanel>
      </Box>
    </Box>
  );
};
