import {
  Card, Typography, Box, TextField, CardMedia, Button,
} from '@mui/material';
import React, {useState} from 'react';

import CardSelect from '@/components/HookCard/CardSelect.tsx';
import {useAppDispatch} from '@/store/hooks.ts';
import {setHook} from '@/store/graphSlice/graphStore.ts';

interface IProps {
  dnsId: number;
  value: number;
  sign: '>' | '<' | '~';
  output: number;
}

export default function HookCard(props: IProps) {
  const dispatch = useAppDispatch();

  const [sign, setSign] = useState<'>' | '<' | '~'>(props.sign);
  const [value, setValue] = useState(0);
  const [output, setOutput] = useState(0);
  const [interval, setInt] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(Number(e.target.value));
  };
  const handleOut = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOutput(Number(e.target.value));
  };

  const handleChangeInt = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInt(Number(e.target.value));
  };

  const handleClick = () => {
    console.log(sign);
    dispatch(setHook({
      id: props.dnsId,
      hook: {
        listenId: props.dnsId,
        sign: sign,
        count: value,
        output: output,
        interval: interval,
      },
    }));
  };

  return (
    <Card sx={{minWidth: 200, m: 2, p: 2}}>
      <CardMedia>
        <Box sx={{width: '100%', marginBottom: 2}}>
          <Typography variant={'h6'}>
            ДНС - {props.dnsId}
          </Typography>
        </Box>
      </CardMedia>
      <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <CardSelect
          setState={setSign}
          state={sign}
        />
        {(sign === '~') &&
          <TextField
            fullWidth
            type='number'
            size='small'
            label='интервал'
            sx={{marginBottom: 2}}
            inputProps={{min: 0, max: 1000}}
            value={interval}
            onChange={handleChangeInt}
          />
        }
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
        <Button
          variant={'contained'}
          fullWidth
          onClick={() => handleClick()}
        >Задать условия</Button>
      </Box>
    </Card>
  );
}