import {Header} from "../Layout/Header/Header";
import {Box, Container, Typography} from "@mui/material";
import {BarChart} from "./Chart/BarChart";
import {PieChart} from "./Chart/PieChart";
import {FlexColumnBox, FlexRowBox} from "../CommonComponents/LayoutComponents";
import {T} from "../CommonComponents/TextComponent";
import {useCategoryCount} from "../SWRHooks/useCategoryCount";
import {useLanguageCount} from "../SWRHooks/useLanguageCount";

export function Main() {
  const {categoryCount, error: error1} = useCategoryCount();
  const {languageCount, error: error2} = useLanguageCount();

  if (error1 || error2) return <>error</>
  if (!categoryCount || !languageCount) return <>loading</>


  return (
    <>
      <Header/>
      <Container maxWidth='xl' sx={{display: 'flex', flexDirection: "column"}}>
        <Box sx={{display: 'flex', flexDirection: 'row'}}>
          <Box sx={{width: 'calc(67% - 32px)', minHeight: '300px', m: '16px', border: '1px solid black'}}>
            <BarChart categoryCount={categoryCount}/>
          </Box>
          <Box sx={{width: 'calc(33% - 32px)', minHeight: '300px', m: '16px', border: '1px solid black'}}>
            <PieChart languageCount={languageCount}/>
          </Box>
        </Box>
        {/*<FlexColumnBox sx={{width: 'calc(100% - 32px)', m: '16px', border: '1px solid black'}}>*/}
        {/*  <Box sx={{ml: '16px'}}><T sx={{fontSize: '2em'}}># of scraped information</T></Box>*/}
        {/*  <FlexRowBox>*/}
        {/*    <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>*/}
        {/*      <T sx={{fontSize: '1.5em', pb: '16px'}}>Personal Information</T>*/}
        {/*      <T>email :</T>*/}
        {/*      <T>phone :</T>*/}
        {/*      <T>credit card :</T>*/}
        {/*      <T>account :</T>*/}
        {/*    </FlexColumnBox>*/}
        {/*    <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>*/}
        {/*      <T sx={{fontSize: '1.5em', pb: '16px'}}>Site Tracking Code</T>*/}
        {/*      <T>google analytics :</T>*/}
        {/*      <T>google verification code :</T>*/}
        {/*      <T>pgp key :</T>*/}
        {/*    </FlexColumnBox>*/}
        {/*    <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>*/}
        {/*      <T sx={{fontSize: '1.5em', pb: '16px'}}>Others</T>*/}
        {/*      <T>BTC wallet address :</T>*/}
        {/*      <T>ETH wallet address :</T>*/}
        {/*      <T>telegram link :</T>*/}
        {/*    </FlexColumnBox>*/}
        {/*  </FlexRowBox>*/}
        {/*</FlexColumnBox>*/}
      </Container>
    </>
  );
}