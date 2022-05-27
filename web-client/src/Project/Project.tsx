import {Header} from "../Layout/Header/Header";
import React from "react";
import {useParams} from "react-router-dom";
import {Box, Container, IconButton} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";
import {FlexColumnBox, FlexRowBox} from "../CommonComponents/LayoutComponents";
import SettingsIcon from '@mui/icons-material/Settings';
import {ProjectSettingDialog} from "./ProjectSettingDialog";
import {useProjects} from "../SWRHooks/useProjects";
import {useProjectBaseInfo} from "../SWRHooks/useProjectBaseInfo";


export function Project() {
  const {projectId} = useParams();
  const {project, error, mutate} = useProjectBaseInfo(projectId!);
  const [open, setOpen] = React.useState(false);

  if (!project && !error) return <>Loading</>
  if (error) return <>error</>

  return (
    <>
      <Header/>
      <ProjectSettingDialog open={open} setOpen={setOpen} projectId={projectId!}/>
      <Container sx={{mt: 4}}>
        <FlexRowBox>
          <FlexColumnBox>
            <T variant='h4' sx={{mb: 1}}>{project!.projectName}</T>
            <T sx={{mb: 3}}>{project!.description}</T>
          </FlexColumnBox>
          <Box sx={{ml: 2}}>
            <IconButton onClick={() => setOpen(true)}>
              <SettingsIcon />
            </IconButton>
          </Box>
        </FlexRowBox>

        <T variant='h6'>{`[${project!.targetDomain}] 모니터링 현황`}</T>
      </Container>
    </>
  );
}