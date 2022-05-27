import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {EditableItem} from "./EditableItem";
import AddIcon from "@mui/icons-material/Add";
import React from "react";
import {EditDialog} from "./EditDialog";
import {AddDialog} from "./AddDialog";
import {addKeyword, deleteKeyword, updateKeyword} from "../../ServerAPICalls/projectKeywordActions";
import {useProjectKeywordSetting} from "../../SWRHooks/useProjectKeywordSetting";
import {deleteMonitoringUrl, updateMonitoringUrl} from "../../ServerAPICalls/projectMonitoringUrlActions";
import Loading from "../../CommonComponents/Loading";

export function KeywordSetting({projectId}: { projectId: string }) {
  const {keywords, error, mutate} = useProjectKeywordSetting(projectId);
  const [loading, setLoading] = React.useState(false);

  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [k1, setK1] = React.useState(false);

  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [k2, setK2] = React.useState(false);

  const [prevKeyword, setPrevKeyword] = React.useState('');

  const onEdit = (keyword: string) => {
    setPrevKeyword(keyword);
    setK2(prev => !prev);
    setOpenEditDialog(true);
  }
  const onAdd = () => {
    setK1(prev => !prev);
    setOpenAddDialog(true)
  }

  if (!keywords && !error) return <>Loading</>
  if (error) return <>error</>

  const handleSubmitDelete = async (keyword: string) => {
    setLoading(true);
    const {result, error} = await deleteKeyword(projectId, keyword);
    setLoading(false);
    if (error) {
      alert(error);
      return;
    }
    await mutate();
  }

  const handleSubmitEdit = async (newKeyword: string) => {
    if (!newKeyword.trim()) {
      alert('empty keyword')
      return
    }
    const {result, error} = await updateKeyword(projectId, prevKeyword, newKeyword);
    if (error) {
      alert(error);
      return;
    }
    await mutate();
    setOpenEditDialog(false);
  }


  const handleSubmitAdd = async (keyword: string) => {
    if (!keyword.trim()) {
      alert('empty keyword')
      return
    }
    const {result, error} = await addKeyword(projectId, keyword);
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
      <AddDialog key={k1 ? 1 : 0} open={openAddDialog} setOpen={setOpenAddDialog} title='키워드 추가' placeholder='Keyword'
                 onSubmit={handleSubmitAdd}/>
      <EditDialog key={k2 ? 3 : 2} open={openEditDialog} setOpen={setOpenEditDialog} title='키워드 수정'
                  onSubmit={handleSubmitEdit} initialValue={prevKeyword}/>

      <List>
        {keywords?.map(({keyword}) => (
          <EditableItem onEdit={() => onEdit(keyword)} onDelete={() => handleSubmitDelete(keyword)} key={keyword} value={keyword}/>
        ))}
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