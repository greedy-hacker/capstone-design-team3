import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {RectButton} from "../../CommonComponents/ButtonComponents";
import {Container, TextField} from "@mui/material";
import {T} from "../../CommonComponents/TextComponent";
import React from "react";

export function EditDialog(props: { open: boolean, setOpen: any }) {
  const {open, setOpen} = props;
  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='수정' buttons={<RectButton>수정</RectButton>}
                     maxWidth='sm'>
      <Container>
        <T>Project Name</T>
        <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}} />
      </Container>
    </DialogContainer>
  )
}