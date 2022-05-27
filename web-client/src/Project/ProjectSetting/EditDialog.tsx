import {DialogContainer} from "../../CommonComponents/DialogContainer";
import {RectButton} from "../../CommonComponents/ButtonComponents";
import {Container, TextField} from "@mui/material";
import {T} from "../../CommonComponents/TextComponent";
import React from "react";
import Loading from "../../CommonComponents/Loading";

export function EditDialog(props: { open: boolean, setOpen: any, title: string, onSubmit: (value: string) => void, initialValue: string }) {
  const {open, setOpen, title, onSubmit, initialValue} = props;
  const [value, setValue] = React.useState(initialValue);
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e:any) => {setValue(e.target.value)}

  const onClick = async () => {
    setLoading(true);
    await onSubmit(value);
    setLoading(false);
  }

  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title={title} buttons={<RectButton onClick={onClick}>수정</RectButton>}
                     maxWidth='sm'>
      <Container>
        <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}}  value={value} onChange={handleChange}/>
        <Loading open={loading} />
      </Container>
    </DialogContainer>
  )
}