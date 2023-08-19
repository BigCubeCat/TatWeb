import {
  Box,
} from '@mui/material';
import HookCard from '@/components/HookCard/HookCard.tsx';
import {useAppSelector} from '@/store/hooks.ts';
import {selectGraphSlice} from '@/store/graphSlice/graphStore.ts';


export default function SideBar() {
  const graphSlice = useAppSelector(selectGraphSlice);
  return (
    <Box sx={{
      position: 'absolute', top: 40, bottom: 0,
      left: 0, zIndex: 99, padding: 1,
      backgroundColor: 'white',
    }}>
      <HookCard
        dnsId={graphSlice.selectedNodeId}
        value={100}
        sign={'больше'}
        output={100}
      />
    </Box>
  );
}