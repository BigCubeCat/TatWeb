import {
  Card, Typography, Box, TextField, CardMedia,
} from '@mui/material';
import React, {useState} from 'react';

import CardSelect from '@/components/HookCard/CardSelect.tsx';

interface IProps {
  dnsId: number;
  value: number;
  sign: string;
  output: number;
};
export default function HookCard(props: IProps) {
  const [sign, setSign] = useState(props.sign);
  const [value, setValue] = useState(0);
  const [output, setOutput] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(Number(e.target.value));
  };
  const handleOut = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOutput(Number(e.target.value));
  };

  console.log(sign);

  return (
    <Card sx={{minWidth: 160, m: 2, p: 2}}>
      <CardMedia>
        <Box sx={{width: '100%', marginBottom: 2}}>
          <Typography variant={'h6'}>
            ДНС - {props.dnsId}
          </Typography>
        </Box>
      </CardMedia>
      <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
        <CardSelect
          label={'знак'}
          setState={setSign}
          state={sign}
          variants={['больше', 'меньше']}
        />
        <TextField
          fullWidth
          type='number'
          size='small'
          label='Значение'
          sx={{marginBottom: 2}}
          inputProps={{min: 0, max: 1000}}
          value={value}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          type='number'
          size='small'
          label='Разгрузить'
          sx={{marginBottom: 2}}
          inputProps={{min: 0, max: 1000}}
          value={output}
          onChange={handleOut}
        />
      </Box>
    </Card>
  );
}