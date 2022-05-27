import {T} from "../../CommonComponents/TextComponent";
import {Box, TextField} from "@mui/material";
import React from "react";
import {RectButton} from "../../CommonComponents/ButtonComponents";
import {useProjectBaseInfo} from "../../SWRHooks/useProjectBaseInfo";
import Loading from "../../CommonComponents/Loading";
import {updateProjectBaseInfo} from "../../ServerAPICalls/projectActions";

export function BaseInfo({projectId}: { projectId: string }) {
  const {project, error, mutate} = useProjectBaseInfo(projectId);
  const [baseInfo, setBaseInfo] = React.useState({
    projectName: '',
    targetDomain: '',
    description: ''
  })
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (project) {
      const {projectName, targetDomain, description} = project;
      setBaseInfo({projectName, targetDomain, description})
    }
  }, [project?.id])
  if (!project && !error) return <>Loading</>
  if (error) return <>error</>

  const handleChange = (e: any) => {
    setBaseInfo((prev: any) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async () => {
    setOpen(true);
    await updateProjectBaseInfo(projectId, baseInfo);
    setOpen(false);
    await mutate();
  }

  return (
    <>
      <T>Project Name</T>
      <TextField required fullWidth name="projectName" size='small' sx={{mb: 1}} value={baseInfo.projectName} onChange={handleChange}/>
      <T>Target Domain</T>
      <TextField required fullWidth name="targetDomain" size='small' sx={{mb: 1}} value={baseInfo.targetDomain} onChange={handleChange}/>
      <T>Project Description</T>
      <TextField required fullWidth name="description" size='small' multiline rows={4}
                 value={baseInfo.description} onChange={handleChange}/>
      <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', mt: 2}}>
        <RectButton onClick={handleSubmit}>수정</RectButton>
      </Box>
      <Loading open={open} />
    </>
  );
}