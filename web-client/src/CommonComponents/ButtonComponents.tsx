import {Button} from "@mui/material";

export function RectButton(props: any) {
  const {children, sx, ...rest} = props
  return (
    <Button variant='contained' sx={{borderRadius: 0, ...sx}} {...rest}>{children}</Button>
  )
}