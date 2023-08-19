import {Box, Button} from '@mui/material';

export default function AppBar() {
  const navStyle = {
    my: 2,
    color: 'primary.main',
    display: 'block',
    width: 100,
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 30,
        zIndex: 100,
        padding: 1,
        paddingLeft: 4,
        paddingRight: 4,
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box sx={{width: 'max-content'}}></Box>
      <Box sx={{display: 'flex'}}>
        <Button sx={navStyle}>Sandbox</Button>
        <Button sx={navStyle}>Live</Button>
      </Box>
    </Box>
  );
}
