import {Header} from "../Layout/Header/Header";
import {Container, Divider, Pagination, TextField} from "@mui/material";
import SearchIconInput from "../CommonComponents/SearchIconInput";
import {MyListView} from "./MyListView/MyListView";
import {SubMenu} from "./SubMenu/SubMenu";
import {ErrorBoundary} from "react-error-boundary";
import React, {Suspense} from "react";
import {T} from "../CommonComponents/TextComponent";
import {FlexRowBox} from "../CommonComponents/LayoutComponents";
import {RectButton} from "../CommonComponents/ButtonComponents";
import {useCount} from "../SWRHooks/useCount";

export interface ResultOptions {
  paged: number;
  sortby: string;
  order: string;
  lang?: string;
  category?: string;
}

export function Result() {
  const {count, error} = useCount();
  const [resultOptions, setResultOptions] = React.useState<ResultOptions>({
    paged: 1,
    sortby: 'id',
    order: 'desc',
    lang: undefined,
    category: undefined
  });
  const [title, setTitle] = React.useState('');
  const [url, setUrl] = React.useState('');

  if (!count && !error) return <>Loading</>
  if (error) return <>Error</>
  return (
    <>
      <Header/>
      <Container maxWidth='lg' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <FlexRowBox sx={{alignItems: 'center', mb: 2}}>
          <T sx={{pr: 3}}>URL Contains</T>
          <TextField size='small' placeholder='https://xyz.onion' sx={{flex: 1}}
                     onBlur={(e) => setTitle(e.target.value)}/>
          <T sx={{px: 3}}>Title Contains</T>
          <TextField size='small' placeholder='Title Sub String' sx={{flex: 1}}
                    onBlur={(e) => setUrl(e.target.value)}/>
          <RectButton sx={{fontSize: '1rem', borderRadius: '4px', bgcolor: '#1877d2', ml: 3}}>Search</RectButton>
        </FlexRowBox>
        <SubMenu setResultOptions={setResultOptions} resultOptions={resultOptions} count={count}/>
        <Divider sx={{my: 2}}/>
        <FlexRowBox sx={{justifyContent: 'flex-end'}}>
          <Pagination count={100} page={resultOptions.paged} onChange={(e, value) => {
            setResultOptions((prev: any) => ({
              ...prev,
              paged: value
            }))
          }} />
        </FlexRowBox>
        <ErrorBoundary FallbackComponent={() => <h2>ERROR!!!</h2>}>
          <Suspense fallback={<h1>Loading ...</h1>}>
            <MyListView resultOptions={resultOptions}/>
          </Suspense>
        </ErrorBoundary>
        <FlexRowBox sx={{justifyContent: 'flex-end'}}>
          <Pagination count={100} page={resultOptions.paged} onChange={(e, value) => {
            setResultOptions((prev: any) => ({
              ...prev,
              paged: value
            }))
          }} />
        </FlexRowBox>
      </Container>
    </>
  );
}