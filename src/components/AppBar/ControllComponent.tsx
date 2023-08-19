import {Box} from '@mui/material';
import UploadFileButton from '@/components/files/UploadFileButton.tsx';
import DownloadFileButton from '@/components/files/DownloadFileButton.tsx';
import {useState} from 'react';

export default function ControlComponent() {
  const [state, setState] = useState('');
  return (
    <Box>
      <UploadFileButton setState={setState} />
      <DownloadFileButton data={{data: state}} filename={'test.json'} />
    </Box>
  );
}
