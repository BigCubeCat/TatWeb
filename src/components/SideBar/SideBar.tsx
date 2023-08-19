import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import HookPanel from './HookPanel';
import ConfPanel from '@/components/SideBar/ConfPanel.tsx';

export default function SideBar() {
  const [currentTab, setCurrentTab] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 40,
        bottom: 0,
        left: 0,
        zIndex: 99,
        padding: 1,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: "space-between"
      }}
    >
      <Box sx={{borderTop: 1, borderColor: 'divider'}}>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Настройки" id="tab-0" />
          <Tab label="Хуки" id="tab-1" />
          <Tab label="Статистика" id="tab-2" />
        </Tabs>
      </Box>
      {currentTab === 0 && <ConfPanel />}
      {currentTab === 1 && <HookPanel />}
    </Box>
  );
}
