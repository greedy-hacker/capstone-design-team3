import {Header} from "../Layout/Header/Header";
import {Container} from "@mui/material";
import SearchIconInput from "../CommonComponents/SearchIconInput";
import {MyListView} from "./MyListView/MyListView";
import {SubMenu} from "./SubMenu/SubMenu";
import {ErrorBoundary} from "react-error-boundary";
import {Suspense, useState} from "react";

export function Result() {
  return (
    <>
      <Header/>
      <Container maxWidth='lg' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <SearchIconInput placeholder='Search Url | Title | Parent Url'/>
        <SubMenu />
        {/*<MyTable/>*/}
        <ErrorBoundary FallbackComponent={() => <h2>ERROR!!!</h2>}>
          <Suspense fallback={<h1>Loading ...</h1>}>
            <MyListView />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </>
  );
}