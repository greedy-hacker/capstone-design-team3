import {Header} from "../Layout/Header/Header";
import {Container} from "@mui/material";
import SearchIconInput from "../CommonComponents/SearchIconInput";
import {RectButton} from "../CommonComponents/ButtonComponents";
import React from "react";
import {SearchResult} from "./SearchResult";

export function Search() {
  const [domain, setDomain] = React.useState('');
  const onChange = (e: any) => {setDomain(e.target.value);}

  return (
    <>
      <Header/>
      <Container maxWidth='md' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <SearchIconInput value={domain} onChange={onChange} placeholder='Enter tor url to analyze' endsWith={
          <RectButton sx={{borderBottomRightRadius: '40px', borderTopRightRadius: '40px'}}>
            Enter
          </RectButton>}
        />
        <SearchResult />
      </Container>
    </>
  );
}