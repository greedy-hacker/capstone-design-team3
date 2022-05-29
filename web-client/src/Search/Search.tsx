import {Header} from "../Layout/Header/Header";
import {Box, Button, Container} from "@mui/material";
import SearchIconInput from "../CommonComponents/SearchIconInput";
import {RectButton} from "../CommonComponents/ButtonComponents";
import React from "react";
import {SearchResult} from "./SearchResult";
import {getDomainAnalysisResult, requestDomainAnalysis} from "../ServerAPICalls/searchActions";
import Loading from "../CommonComponents/Loading";
import {useSearchData} from "../SWRHooks/useSearchData";
import {SearchInfo} from "./SearchInfo";

export function Search() {
  const [domain, setDomain] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const {data, mutate, error} = useSearchData();

  if (!data && !error) return <>Loading</>
  if (error) return <>Error</>

  const url = localStorage.getItem('domain');

  const refresh = async () => {
    setLoading(true);
    await mutate();
    setLoading(false);
  }

  const onChange = (e: any) => {
    setDomain(e.target.value);
  }
  const handleSubmit = async () => {
    if (!domain.trim()) {
      alert('empty');
      return;
    }
    if (!domain.includes('.')) {
      alert('not a domain');
      return;
    }
    setLoading(true);
    localStorage.setItem('domain', domain);
    await requestDomainAnalysis(domain);
    await mutate();
    setLoading(false);
  }

  return (
    <>
      <Header/>
      <Container maxWidth='md' sx={{display: 'flex', flexDirection: "column", mt: 3}}>
        <SearchIconInput value={domain} onChange={onChange} placeholder='Enter tor url to analyze' endsWith={
          <RectButton sx={{borderBottomRightRadius: '40px', borderTopRightRadius: '40px'}} onClick={handleSubmit}>
            Enter
          </RectButton>}
        />
        <SearchInfo url={url || ''} status={data!.status} message={data!.message}/>
        {data!.status === 'SUCCESS' && <SearchResult data={data!.data} url={url || ''}/>}
        <Box>
          <Button onClick={refresh}>새로고침</Button>
        </Box>
        <Loading open={loading}/>
      </Container>
    </>
  );
}