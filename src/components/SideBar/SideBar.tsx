import {
  Box, Typography,
} from '@mui/material';
import HookCard from '@/components/HookCard/HookCard.tsx';


export default function SideBar() {
  return (
    <Box sx={{
      position: "absolute", top: 40, bottom: 0,
      left: 0, zIndex: 99, padding: 1,
      backgroundColor: "white"
    }}>
      <Typography >Text</Typography>
      <HookCard dnsId={0} value={100} sign={">"} output={100} />
    </Box>
  )
}