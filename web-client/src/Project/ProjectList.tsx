import {Header} from "../Layout/Header/Header";
import {Box, IconButton, Container, Grid, Paper} from "@mui/material";
import {FlexColumnBox, FlexRowBox} from "../CommonComponents/LayoutComponents";
import {T} from "../CommonComponents/TextComponent";
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from "react";
import {ProjectCreateDialog} from "./ProjectCreateDialog";
import {useNavigate} from "react-router-dom";
import {useProjects} from "../SWRHooks/useProjects";

const Item = (props: { title: string, description: string, id: number, targetDomain: string }) => {
  const {title, description, id, targetDomain} = props;

  const navigate = useNavigate();

  return (
    <Paper variant="outlined" sx={{height: '100px', p: 2, cursor: 'pointer', '&:hover': {borderColor: 'blue'}}}
           onClick={() => {
             navigate(`${id}`)
           }}>
      <T sx={{fontSize: '1rem', pb: 1}}><strong>{title}</strong></T>
      <T>target domain: {targetDomain}</T>
      <T>description: {description}</T>
    </Paper>
  )
}



export function ProjectList() {
  const [open, setOpen] = React.useState(false);


  const {projects, error} = useProjects();
  const openProjectCreateDialog = () => {
    setOpen(true);
  }
  if (!projects && !error) return <>Loading</>
  if (error) return <>error</>
  return (
    <>
      <Header/>
      <ProjectCreateDialog open={open} setOpen={setOpen}/>
      <Container sx={{mt: 4}}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {
            projects!.map(project => (
              <Grid item xs={4} key={project.id}>
                <Item title={project.projectName} description={project.description} id={project.id} targetDomain={project.targetDomain}/>
              </Grid>
            ))
          }
          <Grid item xs={4}>
            <Paper variant="outlined" sx={{height: '100px', p: 2, cursor: 'pointer', '&:hover': {borderColor: 'blue'}}}
                   onClick={openProjectCreateDialog}>
              <FlexRowBox sx={{justifyContent: 'center', height: '100%'}}>
                <IconButton sx={{margin: 'auto 0'}}>
                  <AddBoxIcon/>
                </IconButton>
              </FlexRowBox>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}