import {Box} from "@mui/material";

export function FlexRowBox(props: any) {
  return (
    <Box display='flex' flexDirection='row' {...props}/>
  )
}
export function FlexColumnBox(props: any) {
  return (
    <Box display='flex' flexDirection='column' {...props}/>
  )
}