import {Header} from "../Layout/Header/Header";
import {Box, Container, Typography} from "@mui/material";
import {BarChart} from "./Chart/BarChart";
import {PieChart} from "./Chart/PieChart";
import {FlexColumnBox, FlexRowBox} from "../CommonComponents/LayoutComponents";
import {T} from "../CommonComponents/TextComponent";
import {useCategoryCount} from "../SWRHooks/useCategoryCount";
import {useLanguageCount} from "../SWRHooks/useLanguageCount";
import {getAllCSV} from "../ServerAPICalls/getAllCSV";
import React, {useEffect} from "react";
import {usePapaParse} from 'react-papaparse';
import {plainToInstance} from "class-transformer";
import {SiteInfo} from "../SWRHooks/useAnalyzedData";

export function Main() {
  const {categoryCount, error: error1} = useCategoryCount();
  const {languageCount, error: error2} = useLanguageCount();
  const [csvResult, setCsvResult] = React.useState<any>();
  const {readString} = usePapaParse();
  useEffect(() => {
    getAllCSV().then(result => {
      if (result.result) {
        readString(result.result, {
          worker: true,
          complete(results: any) {
            let r = [];
            for (const [index, row] of results.data.entries()) {
              if (index === 0) continue;
              const obj: any = {};
              for (const [i,key] of results.data[0].entries()) {
                obj[key] = row[i];
              }
              r.push(obj);
            }
            r = plainToInstance(SiteInfo, r as any[]);
            const emails = new Set();
            const phones = new Set();
            const credits = new Set();
            const passports = new Set();
            const googleAnalytics = new Set();
            const googleSiteVerifications = new Set();
            const BTCs = new Set();
            const telegrams = new Set();
            for (const row of r) {
              row.personal_information['email']?.forEach(v => emails.add(v));
              row.personal_information['phone']?.forEach(v => phones.add(v));
              row.personal_information['credit']?.forEach(v => credits.add(v));
              row.personal_information['passport']?.forEach(v => passports.add(v));
              row.site_tracking_codes['google_analytics']?.forEach(v => googleAnalytics.add(v));
              row.site_tracking_codes['google_site_verification']?.forEach(v => googleSiteVerifications.add(v));
              row.others['bitcoin']?.forEach(v => BTCs.add(v));
              row.others['telegram']?.forEach(v => telegrams.add(v));
            }
            setCsvResult({
              email: emails.size,
              phone: phones.size,
              credit: credits.size,
              passport: passports.size,
              ga: googleAnalytics.size,
              gsv: googleSiteVerifications.size,
              btc: BTCs.size,
              telegram: telegrams.size
            });
            console.log(r);
          }
        })
      } else {
        setCsvResult('error')
      }
    });
  }, [])
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
        {!csvResult && (
          <>Loading</>
        )}
        {csvResult === 'error' && (
          <>Error</>
        )}
        {csvResult && csvResult !== 'error' && (
          <FlexColumnBox sx={{width: 'calc(100% - 32px)', m: '16px', border: '1px solid black'}}>
            <Box sx={{ml: '16px'}}><T sx={{fontSize: '2em'}}># of scraped information</T></Box>
            <FlexRowBox>
              <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>
                <T sx={{fontSize: '1.5em', pb: '16px'}}>Personal Information</T>
                <T>email : {csvResult.email}</T>
                <T>phone : {csvResult.phone}</T>
                <T>credit card : {csvResult.credit}</T>
                <T>passport : {csvResult.passport}</T>
              </FlexColumnBox>
              <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>
                <T sx={{fontSize: '1.5em', pb: '16px'}}>Site Tracking Code</T>
                <T>google analytics : {csvResult.ga}</T>
                <T>google verification code : {csvResult.gsv}</T>
              </FlexColumnBox>
              <FlexColumnBox sx={{flex: 1, mx: '16px', p: '16px'}}>
                <T sx={{fontSize: '1.5em', pb: '16px'}}>Others</T>
                <T>BTC wallet address : {csvResult.btc}</T>
                <T>telegram link : {csvResult.telegram}</T>
              </FlexColumnBox>
            </FlexRowBox>
          </FlexColumnBox>
        )}
      </Container>
    </>
  );
}