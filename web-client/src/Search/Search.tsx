import {Header} from "../Layout/Header/Header";
import {Box, Container, Typography} from "@mui/material";
import SearchIconInput from "../CommonComponents/SearchIconInput";
import {RectButton} from "../CommonComponents/ButtonComponents";

export function Search() {
  return (
    <>
      <Header/>
      <Container maxWidth='md' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <SearchIconInput placeholder='Enter tor url to analyze' endsWith={
          <RectButton sx={{borderBottomRightRadius: '40px', borderTopRightRadius: '40px'}}>
            Enter
          </RectButton>}
        />
      </Container>
    </>
  );
}