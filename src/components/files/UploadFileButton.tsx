import {
  Button,
} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';
import React from 'react';

export default function UploadFileButton(
  props: {setState: React.Dispatch<React.SetStateAction<string>>},
) {
  const showFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = "" + e.target?.result;
      console.log(text);
      props.setState(text);
    };
    const files = e.target.files || new FileList();
    reader.readAsText(files[0]);
  };
  return <Button
    variant='contained'
    component='label'
    startIcon={<UploadIcon />}
    sx={{width: 120}}
  >
    Upload
    <input
      type='file'
      onChange={(e) => showFile(e)}
      hidden
    />
  </Button>;
}