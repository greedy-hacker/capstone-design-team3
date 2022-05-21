import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {EditableItem} from "./EditableItem";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {EditDialog} from "./EditDialog";
import {AddDialog} from "./AddDialog";

export function KeywordSetting() {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const onEdit = () => {setOpenEditDialog(true)}
  const onAdd = () => {setOpenAddDialog(true)}

  return (
    <Box>
      <EditDialog open={openEditDialog} setOpen={setOpenEditDialog} />
      <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
      <List>
        <EditableItem onEdit={onEdit} onDelete={null} title="마약" />
        <EditableItem onEdit={onEdit} onDelete={null} title="성수동" />
        <EditableItem onEdit={onEdit} onDelete={null} title="01000000000" />
        <EditableItem onEdit={onEdit} onDelete={null} title="asdf" />
        <ListItem disablePadding>
          <ListItemButton onClick={onAdd}>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary="Add Keyword"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}