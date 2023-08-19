import {Button} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import React from 'react';

export default function UploadFileButton(props: {
  setState: (state: string) => void;
}) {
  const showFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = '' + e.target?.result;
      props.setState(text);
    };
    const files = e.target.files || new FileList();
    reader.readAsText(files[0]);
  };
  return (
    <Button
      variant="contained"
      component="label"
      endIcon={<UploadIcon />}
      sx={{width: 80}}
    >
      Load
      <input type="file" onChange={(e) => showFile(e)} hidden />
    </Button>
  );
}
