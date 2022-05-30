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
import {useCategoryCount} from "../SWRHooks/useCategoryCount";
import {useLanguageCount} from "../SWRHooks/useLanguageCount";

export interface ResultOptions {
  paged: number;
  sortby: string;
  order: string;
  lang?: string;
  category?: string;
  title?: string;
  url?: string;
}

const initialOptions= {
  paged: 1,
  sortby: 'search_time',
  order: 'desc',
  lang: '',
  category: '',
  title: '',
  url: ''
}

export function Result() {
  const {languageCount, error} = useLanguageCount();
  const [resultOptions, setResultOptions] = React.useState<ResultOptions>(initialOptions);
  const [resultOptionsInput, setResultOptionsInput] = React.useState<ResultOptions>(initialOptions);

  const handleChange = (e:any) => {
    setResultOptionsInput((prev: any) => ({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }
  const syncResultOptions = () => {
    setResultOptions(resultOptionsInput);
  }

  if (!languageCount && !error) return <>Loading</>
  if (error) return <>Error</>
  return (
    <>
      <Header/>
      <Container maxWidth='lg' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <FlexRowBox sx={{alignItems: 'center', mb: 2}}>
          <T sx={{pr: 3}}>URL Contains</T>
          <TextField size='small' placeholder='https://xyz.onion' sx={{flex: 1}} name='url'
                     onBlur={handleChange}/>
          <T sx={{px: 3}}>Title Contains</T>
          <TextField size='small' placeholder='Title Sub String' sx={{flex: 1}} name='title'
                    onBlur={handleChange}/>
          <RectButton sx={{fontSize: '1rem', borderRadius: '4px', bgcolor: '#1877d2', ml: 3}} onClick={syncResultOptions}>Search</RectButton>
        </FlexRowBox>
        <SubMenu setResultOptions={setResultOptionsInput} resultOptions={resultOptionsInput} languageCount={languageCount}/>
        <Divider sx={{my: 2}}/>
        <FlexRowBox sx={{justifyContent: 'flex-end'}}>
          <Pagination count={100} page={resultOptionsInput.paged} onChange={(e, value) => {
            setResultOptionsInput((prev: any) => ({
              ...prev,
              paged: value
            }))
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
          <Pagination count={100} page={resultOptionsInput.paged} onChange={(e, value) => {
            setResultOptionsInput((prev: any) => ({
              ...prev,
              paged: value
            }))
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