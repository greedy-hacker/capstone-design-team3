import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {RectButton} from "../../CommonComponents/ButtonComponents";
import {Container, TextField} from "@mui/material";
import {T} from "../../CommonComponents/TextComponent";
import React from "react";

export function AddDialog(props: { open: boolean, setOpen: any }) {
  const {open, setOpen} = props;
  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='추가' buttons={<RectButton>추가</RectButton>}
                     maxWidth='sm'>
      <Container>
        <T>Project Name</T>
        <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}} />
      </Container>
    </DialogContainer>
  )
}