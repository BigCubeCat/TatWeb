import {
  FormControl, Select, MenuItem, SelectChangeEvent, InputAdornment,
} from '@mui/material';
import React from 'react';

interface SelectProps {
  setState: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  label: string;
  variants: string[];
}

export default function CardSelect(props: SelectProps) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setState(event.target.value);
  };
  return (
    <FormControl
      fullWidth
      sx={{marginBottom: 2}}
    >
      <Select
        fullWidth
        size={'small'}
        value={props.state}
        onChange={handleChange}
        startAdornment={<InputAdornment position='start'>Если</InputAdornment>}
      >
        <MenuItem value={'больше'}>больше</MenuItem>
        <MenuItem value={'меньше'}>меньше</MenuItem>
      </Select>
    </FormControl>
  )
    ;
}