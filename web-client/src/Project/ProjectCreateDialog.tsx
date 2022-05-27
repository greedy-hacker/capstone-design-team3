import React from "react";
import {DialogContainer} from "../CommonComponents/DialogContainer";
import {RectButton} from "../CommonComponents/ButtonComponents";
import {Container, TextField} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";
import Loading from "../CommonComponents/Loading";
import {useProjects} from "../SWRHooks/useProjects";
import {addProject} from "../ServerAPICalls/projectActions";

export function ProjectCreateDialog(props: { open: boolean, setOpen: any }) {
  const {mutate} = useProjects();
  const {open, setOpen} = props;
  const [loading, setLoading] = React.useState(false);
  const [projectForm, setProjectForm] = React.useState({
    projectName: '',
    targetDomain: '',
    description: ''
  })
  const onChange = (e: any) => {
    const {name, value} = e.target;
    setProjectForm((prev:any) => ({
      ...prev,
      [name]: value
    }))
  }
  const onSubmit = async () => {
    if (projectForm.projectName && projectForm.targetDomain && projectForm.description) {
      setLoading(true);
      const {result, error} = await addProject(projectForm);
      setLoading(false);
      if (error) {
        alert(error);
        return;
      }
      setOpen(false);
      mutate();
    }
  }
  return (
    <DialogContainer open={open} onClose={() => setOpen(false)} title='프로젝트 생성' buttons={<RectButton onClick={onSubmit}>생성</RectButton>}
                     maxWidth='sm'>
      <Container>
        <T>Project Name</T>
        <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}} onBlur={onChange} />
        <T>Target Domain</T>
        <TextField required fullWidth name="targetDomain" size='small' sx={{mb: 1}} onBlur={onChange} />
        <T>Project Description</T>
        <TextField required fullWidth name="description" size='small' multiline rows={4} onBlur={onChange} />
      </Container>
      <Loading open={loading} />
    </DialogContainer>
  )
}