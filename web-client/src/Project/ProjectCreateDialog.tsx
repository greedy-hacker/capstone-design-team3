import React from "react";
import {DialogContainer} from "../CommonComponents/DialogContainer";
import {RectButton} from "../CommonComponents/ButtonComponents";
import {Container, TextField} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";

export function ProjectCreateDialog(props: { open: boolean, setOpen: any }) {
  const {open, setOpen} = props;
  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='프로젝트 생성' buttons={<RectButton>생성</RectButton>}
                     maxWidth='sm'>
      <Container>
        <T>Project Name</T>
        <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}} />
        <T>Target Domain</T>
        <TextField required fullWidth name="targetDomain" size='small' sx={{mb: 1}} />
        <T>Project Description</T>
        <TextField required fullWidth name="description" size='small' multiline rows={4} />
      </Container>
    </DialogContainer>
  )
}