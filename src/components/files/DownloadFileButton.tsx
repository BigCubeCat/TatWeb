import DownloadIcon from '@mui/icons-material/Download';
import {Button} from '@mui/material';


export default function DownloadFileButton(
  props: {data: object, filename: string},
) {
  const downloadTxtFile = () => {
    const element = document.createElement('a');
    const blob = new Blob([JSON.stringify(props.data, null, 2)], {
      type: 'application/json',
    });
    element.href = URL.createObjectURL(blob);
    element.download = props.filename;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
  };
  return <Button
    variant={"contained"}
    onClick={downloadTxtFile}
    startIcon={<DownloadIcon />}
    sx={{width: 120}}
  >
    Download
  </Button>
}