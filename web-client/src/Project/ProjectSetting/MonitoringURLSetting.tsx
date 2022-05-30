import React from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {EditableItem} from "./EditableItem";
import {EditDialog} from "./EditDialog";
import {AddDialog} from "./AddDialog";
import {useProjectUrlSetting} from "../../SWRHooks/useProjectUrlSetting";
import {
  addMonitoringUrl,
  deleteMonitoringUrl,
  updateMonitoringUrl
} from "../../ServerAPICalls/projectMonitoringUrlActions";
import Loading from "../../CommonComponents/Loading";

export function MonitoringURLSetting({projectId}: { projectId: string }) {
  const {urls, error, mutate} = useProjectUrlSetting(projectId);
  const [loading, setLoading] = React.useState(false);

  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [k1, setK1] = React.useState(false);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [k2, setK2] = React.useState(false);

  const [prevUrl, setPrevUrl] = React.useState('');
  const onEdit = (url: string) => {
    setPrevUrl(url);
    setK2(prev => !prev);
    setOpenEditDialog(true)
  }
  const onAdd = () => {
    setK1(prev => !prev);
    setOpenAddDialog(true)
  }

  if (!urls && !error) return <>Loading</>
  if (error) return <>error</>

  const handleSubmitDelete = async (url: string) => {
    setLoading(true);
    const {result, error} = await deleteMonitoringUrl(projectId, url);
    setLoading(false);
    if (error) {
      alert(error);
      return;
    }
    await mutate();
  }

  const handleSubmitEdit = async ( newUrl: string) => {
    if (!newUrl.endsWith('.onion')) {
      alert('url should end with .onion')
      return
    }
    if (!newUrl.startsWith('https://') && !newUrl.startsWith('http://')) {
      alert('url should start with http(s)://')
      return
    }
    const {result, error} = await updateMonitoringUrl(projectId, prevUrl, newUrl);
    if (error) {
      alert(error);
      return;
    }
    await mutate();
    setOpenEditDialog(false);
  }

  const handleSubmitAdd = async (url: string) => {
    if (!url.includes('.onion')) {
      alert('url should include .onion')
      return
    }
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      alert('url should start with http(s)://')
      return
    }
    const {result, error} = await addMonitoringUrl(projectId, url);
    if (error) {
      alert(error);
      return;
    }
    await mutate();
    setOpenAddDialog(false);
  }

  return (
    <Box>
      <Loading open={loading}/>
      <AddDialog key={k1 ? 1 : 0} open={openAddDialog} setOpen={setOpenAddDialog} title='모니터링 URL 추가'
                 placeholder='https://xyz.onion' onSubmit={handleSubmitAdd}/>
      <EditDialog key={k2 ? 3 : 2} open={openEditDialog} setOpen={setOpenEditDialog} title='모니터링 URL 수정'
                  onSubmit={handleSubmitEdit} initialValue={prevUrl}/>
      <List>
        {urls?.map(({url}) => (
          <EditableItem onEdit={() => onEdit(url)} onDelete={() => handleSubmitDelete(url)} key={url} value={url}/>
        ))}
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