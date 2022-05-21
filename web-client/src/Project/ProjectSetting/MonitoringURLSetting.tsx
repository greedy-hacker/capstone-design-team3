import React from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EditableItem} from "./EditableItem";
import {EditDialog} from "./EditDialog";
import {AddDialog} from "./AddDialog";

export function MonitoringURLSetting() {
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);

  const onEdit = () => {setOpenEditDialog(true)}
  const onAdd = () => {setOpenAddDialog(true)}

  return (
    <Box>
      <EditDialog open={openEditDialog} setOpen={setOpenEditDialog} />
      <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
      <List>
        <EditableItem onEdit={onEdit} onDelete={null} title="xyz.onion" />
        <EditableItem onEdit={onEdit} onDelete={null} title="xyz.onion" />
        <EditableItem onEdit={onEdit} onDelete={null} title="xyz.onion" />
        <EditableItem onEdit={onEdit} onDelete={null} title="xyz.onion" />
        <ListItem disablePadding>
          <ListItemButton onClick={onAdd}>
            <ListItemIcon>
              <AddIcon/>
            </ListItemIcon>
            <ListItemText primary="Add Monitoring URL"/>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}