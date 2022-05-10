import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as React from 'react';

export function DialogContainer(props: {
  children: React.ReactNode, open: boolean, onClose: any,
  title: string, buttons: React.ReactNode, maxWidth: any
}) {
  return (
    <Dialog
      PaperProps={{sx: {borderRadius: '10px'}}}
      open={props.open}
      onClose={props.onClose}
      fullWidth
      maxWidth={props.maxWidth}
    >
      <DialogTitle>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <strong>{props.title}</strong>
          <IconButton aria-label="close" onClick={props.onClose}>
            <CloseIcon/>
          </IconButton>
        </Grid>
      </DialogTitle>
      <DialogContent>{props.children}</DialogContent>
      {props.buttons && <DialogActions sx={{pb: '24px', px: '24px'}}>{props.buttons}</DialogActions>}
    </Dialog>
  );
}
