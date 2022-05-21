import {T} from "../../CommonComponents/TextComponent";
import {Box, TextField} from "@mui/material";
import React from "react";
import {RectButton} from "../../CommonComponents/ButtonComponents";

export function BaseInfo() {
  return (
    <>
      <T>Project Name</T>
      <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}}/>
      <T>Target Domain</T>
      <TextField required fullWidth name="targetDomain" size='small' sx={{mb: 1}}/>
      <T>Project Description</T>
      <TextField required fullWidth name="description" size='small' multiline rows={4}/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 2}}>
        <RectButton>수정</RectButton>
      </Box>
    </>
  );
}