import {Box, Paper} from "@mui/material";
import {T} from "../CommonComponents/TextComponent";

export function SearchInfo({url, status, message}: {url: string, status: string, message: string}) {
  return (
    <Box>
      <T variant='h5' sx={{mb:1}}>Reqeust Information</T>
      <Paper sx={{mb: '32px', p: 2, border: '1px solid black'}}>
        <T sx={{pb:1}}>Requested URL : {url}</T>
        <T sx={{pb:1}}>Status : {status} ({message})</T>
      </Paper>
    </Box>
  )
}