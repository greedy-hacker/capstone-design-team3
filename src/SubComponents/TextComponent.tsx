import {Typography} from "@mui/material";

export function EllipsisTypography(props: any) {
  return <Typography whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis' {...props} />
}

export function T(props: any) {
  return <Typography {...props}/>
}