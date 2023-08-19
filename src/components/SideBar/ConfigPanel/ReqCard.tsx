import { Box, Card, Typography } from '@mui/material';

import UploadFileButton from '@/components/files/UploadFileButton.tsx';
import { setTopoFile } from '@/store/confSlice/configStore.ts';
import DownloadFileButton from '@/components/files/DownloadFileButton.tsx';
import { useAppDispatch, useAppSelector } from '@/store/hooks.ts';
import { selectGraphSlice } from '@/store/graphSlice/graphStore.ts';

export default function ReqCard() {
  const dispatch = useAppDispatch();
  const { reqs } = useAppSelector(selectGraphSlice);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 200,
        p: 2,
      }}
    >
      <Typography
        variant={'h6'}
        textAlign={'center'}
        sx={{ marginBottom: 2 }}
      >
        Данные датчиков
      </Typography>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 180,
        }}
      >
        <UploadFileButton
          setState={fileContent => dispatch(setTopoFile(fileContent))}
        />
        <DownloadFileButton
          data={reqs} filename={'requests.json'}
        />
      </Box>
    </Card>
  );
};
