import {Box} from '@mui/material';
import StepSlider from './StepSlider';


export default function Footer() {
  return (
    <Box sx={{
      position: 'absolute',
      bottom: 5, right: '15vw',
      width: '50vw',
      backgroundColor: 'white',
      p: 2,
      borderRadius: 10,
      display: "flex",
      alignItems: "center"
    }}>
      <StepSlider />
    </Box>
  );
}