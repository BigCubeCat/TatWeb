import {Box, Typography} from '@mui/material';
import EngineCard from '@/components/SideBar/ConfigPanel/EngineCard.tsx';
import ReqCard from './ConfigPanel/ReqCard';

export default function ConfPanel() {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>
      <Typography
        variant='h5'
        sx={{width: '100%', marginBottom: 2}}
        textAlign={'center'}
      >
        Файлы системы
      </Typography>
      <EngineCard />
      <ReqCard />
    </Box>
  );
}
