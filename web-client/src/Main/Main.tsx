import {Header} from "../Layout/Header/Header";
import {BarChart} from "./Chart/Chart";
import {Box, Container, Typography} from "@mui/material";

export function Main() {
  return (
    <>
      <Header/>
      <Container maxWidth='xl' sx={{display: 'flex', flexDirection: "column"}}>
        <Box sx={{bgcolor: 'rgb(66, 165, 245)',color: 'white', my: 3, p:3}}>
          <Typography>Darkweb Research Project</Typography>
        </Box>
        <BarChart/>
      </Container>
    </>
  );
}