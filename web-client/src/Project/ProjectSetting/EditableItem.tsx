import {IconButton, ListItem, ListItemText} from "@mui/material";
import AutoFixNormalIcon from "@mui/icons-material/AutoFixNormal";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

export function EditableItem(props: {title: string, onEdit: any, onDelete: any}) {
  const {title, onEdit, onDelete} = props;
  return (
    <ListItem secondaryAction={
      <>
        <IconButton aria-label="modify" onClick={onEdit}>
          <AutoFixNormalIcon/>
        </IconButton>
        <IconButton aria-label="delete" onClick={onDelete}>
          <DeleteIcon/>
        </IconButton>
      </>
    }>
      <ListItemText primary={title}/>
    </ListItem>
  )
}