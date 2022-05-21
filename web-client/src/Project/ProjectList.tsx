import {Header} from "../Layout/Header/Header";
import {Box, IconButton, Container, Grid, Paper} from "@mui/material";
import {FlexColumnBox, FlexRowBox} from "../CommonComponents/LayoutComponents";
import {T} from "../CommonComponents/TextComponent";
import AddBoxIcon from '@mui/icons-material/AddBox';
import React from "react";
import {ProjectCreateDialog} from "./ProjectCreateDialog";
import {useNavigate} from "react-router-dom";

const Item = (props: { title: string, description: string, id: string }) => {
  const {title, description, id} = props;

  const navigate = useNavigate();

  return (
    <Paper variant="outlined" sx={{height: '100px', p: 2, cursor: 'pointer', '&:hover': {borderColor: 'blue'}}}
           onClick={() => {
             navigate(id)
           }}>
      <T sx={{fontSize: '1rem', pb: 1}}><strong>{title}</strong></T>
      <T>{description}</T>
    </Paper>
  )
}


function useProjects(): { projectName: string, description: string, id: string }[] {
  return [
    {projectName: 'proj1', description: 'hihi', id: '1251251'},
    {projectName: 'proj2', description: 'hihaaai', id: '124124'},
    {projectName: 'proj3', description: 'hihi', id: '1251asdf251'},
    {projectName: 'proj4', description: 'hihi', id: '12512zxcv51'},
    {projectName: 'proj5', description: 'hihi', id: '1251251'},
  ]
}

export function ProjectList() {
  const [open, setOpen] = React.useState(false);


  const projects = useProjects();
  const openProjectCreateDialog = () => {
    setOpen(true);
  }
  return (
    <>
      <Header/>
      <ProjectCreateDialog open={open} setOpen={setOpen}/>
      <Container sx={{mt: 4}}>
        <Grid container rowSpacing={3} columnSpacing={3}>
          {
            projects.map(project => (
              <Grid item xs={4}>
                <Item title={project.projectName} description={project.description} id={project.id}/>
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