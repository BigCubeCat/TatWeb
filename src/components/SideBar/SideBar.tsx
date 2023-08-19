import React, {useState} from 'react';
import {Box, Tab, Tabs} from '@mui/material';
import HookPanel from './HookPanel';
import ConfPanel from '@/components/SideBar/ConfPanel.tsx';
import useEngine from '@/engine/useEngine.ts';

export default function SideBar() {
  const [currentTab, setCurrentTab] = useState(0);
  const {status} = useEngine();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  console.log(status);
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 40,
        bottom: 0,
        left: 0,
        zIndex: 99,
        padding: 1,
        width: 280,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column-reverse',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{borderTop: 1, borderColor: 'divider'}}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          variant='scrollable'
        >
          <Tab label='Настройки' id='tab-0' />
          <Tab label='Хуки' id='tab-1' />
          <Tab label='Статистика' id='tab-2' />
        </Tabs>
      </Box>
      {currentTab === 0 && <ConfPanel />}
      {currentTab === 1 && <HookPanel />}
    </Box>
  );
}
