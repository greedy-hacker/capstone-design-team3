import {Paper, Box, Divider} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";
import {TreeViewResult} from "./TreeViewResult";

export function SearchResult() {
  return (
    <Box>
      <T variant='h5' sx={{mb:1}}>Reqeust Information</T>
      <Paper sx={{mb: '32px', p: 2, border: '1px solid black'}}>
        <T sx={{pb:1}}>Requested URL : </T>
        <T sx={{pb:1}}>Status : </T>
      </Paper>
      <T variant='h5' sx={{mb:1}}>Analysis Result</T>
      <Paper sx={{mb: '32px', p: 2, border: '1px solid black'}}>
        <T sx={{pb:1}}>Total Pages : </T>
        <T sx={{pb:1}}>Max Depth : </T>
        <T sx={{pb:1}}>Traffic Score : </T>
        <T sx={{pb:1}}>Other Services : </T>
        <Divider sx={{my: 3}}/>
        <T sx={{pb:1}}>Tree Structure</T>
        <TreeViewResult />
      </Paper>
    </Box>
  );
}