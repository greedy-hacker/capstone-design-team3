import {Backdrop, CircularProgress} from '@mui/material';

export default function Loading({open}:{open: boolean}) {
  return (
    <Backdrop sx={{color: '#fff',  zIndex: 2000}} open={open}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
