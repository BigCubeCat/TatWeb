import {Box} from '@mui/material';
import HookCard from '@/components/HookCard/HookCard.tsx';
import {useAppSelector} from '@/store/hooks.ts';
import {selectGraphSlice} from '@/store/graphSlice/graphStore.ts';

export default function HookPanel() {
  const store = useAppSelector(selectGraphSlice);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {store.selectedNodeId >= 0 && (
        <HookCard
          dnsId={store.selectedNodeId}
          value={store.engine.hooks[store.selectedNodeId].count}
          sign={'>'}
          output={store.engine.hooks[store.selectedNodeId].output}
        />
      )}
    </Box>
  );
}
