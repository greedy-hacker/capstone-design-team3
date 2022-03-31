import {Header} from "../Layout/Header/Header";
import {Container} from "@mui/material";
import {MyTable} from "./MyTable/MyTable";
import SearchIconInput from "../SubComponents/SearchIconInput";
import {MyListView} from "./MyListView/MyListView";
import {SubMenu} from "./SubMenu/SubMenu";

export function Result() {
  return (
    <>
      <Header/>
      <Container maxWidth='lg' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <SearchIconInput placeholder='Search Url | Title | Parent Url'/>
        <SubMenu />
        {/*<MyTable/>*/}
        <MyListView />
      </Container>
    </>
  );
}