import {
  Box,
  Button,
  Divider,
  Paper,
  Table, TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from "@mui/material";
import {FlexColumnBox, FlexRowBox} from "../../CommonComponents/LayoutComponents";
import {EllipsisTypography, T} from "../../CommonComponents/TextComponent";
import {CategoryTag, LanguageTag, Tag} from "../../CommonComponents/Tag";
import {DialogContainer} from "../../CommonComponents/DialogContainer";
import React, {useState} from "react";
import {SiteInfo, useAnalyzedData} from "../../SWRHooks/useAnalyzedData";


export function MyListView() {
  // const data = getSiteInformation()
  const [siteInfo, setSiteInfo] = useState<SiteInfo | null>(null);
  const {data} = useAnalyzedData()

  console.log(data)

  function objToTags(obj: { [key: string]: string[] }) {
    return (
      <>
        {Object.entries(obj).filter(([key, value]) => value.length > 0).map(([key, value]) => (
          <Tag key={key} text={`${key} : ${value.length}`}/>
        ))}
      </>
    )
  }

  const [open, setOpen] = React.useState(false);
  return (
    <>
      <DialogContainer open={open} onClose={() => setOpen(false)} title='사이트 분석정보' buttons={null} maxWidth='md'>
        {
          siteInfo && <TableContainer component={Box}>
            <Button variant='contained' sx={{mr: 2}}>스크린샷</Button>
            <Button variant='contained' sx={{mr: 2}}>HTML</Button>
            <Button variant='contained'>출력</Button>
            <T variant='h6' sx={{mt:2}}>기본정보</T>
            <Table
              sx={{
                '& td, & th': {
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  fontWeight: 'bold',
                },
              }}
            >
              <TableBody>
                <TableRow>
                  <TableCell width='100px'>Tor URL</TableCell>
                  <TableCell>{siteInfo!.url}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>{siteInfo!.title}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>언어</TableCell>
                  <TableCell>{siteInfo!.language}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>카테고리</TableCell>
                  <TableCell>{siteInfo!.category}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <T variant='h6' sx={{pt: 2}}>추가정보</T>
            <Box sx={{mt: 2, mb: 1}}>
              <T variant='h7'>사이트 추적 정보</T>
            </Box>
            <Table
              sx={{
                '& td, & th': {
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                },
              }}>
              <TableBody>
                {Object.entries(siteInfo.site_tracking_codes).map(([key, arr]) => (
                  <TableRow key={key}>
                    <TableCell width='200px'>
                      {key}
                    </TableCell>
                    <TableCell>
                      {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{mt: 2, mb: 1}}>
              <T variant='h7'>개인 정보</T>
            </Box>
            <Table
              sx={{
                '& td, & th': {
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                },
              }}>
              <TableBody>
                {Object.entries(siteInfo.personal_information).map(([key, arr]) => (
                  <TableRow key={key}>
                    <TableCell width='200px'>
                      {key}
                    </TableCell>
                    <TableCell >
                    {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{mt: 2, mb: 1}}>
              <T variant='h7'>기타 정보</T>
            </Box>
            <Table
              sx={{
                '& td, & th': {
                  border: '1px solid black',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                },
              }}>
              <TableBody>
                {Object.entries(siteInfo.others).map(([key, arr]) => (
                  <TableRow key={key}>
                    <TableCell width='200px'>
                      {key}
                    </TableCell>
                    <TableCell>
                      {arr.length ? <ul style={{textAlign: "start"}}>{arr.map(v => <li>{v}</li>)}</ul> : 'Not Found'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }

      </DialogContainer>
      {
        data.map(row => (
          <Paper key={row.id} elevation={3} sx={{p: 1, my: 2}}>
            <FlexRowBox>
              <Box sx={{width: '220px', height: '150px'}}>
                스크린샷 미리보기
              </Box>
              <Divider orientation="vertical" flexItem sx={{mx: 1}}/>
              <FlexColumnBox sx={{flex: 1, minWidth: 0, height: '100%'}}>
                <EllipsisTypography
                  sx={{fontSize: '1.2rem', pr: 3, pb: 1}}><strong>{row.title}</strong>
                </EllipsisTypography>
                <FlexRowBox sx={{alignItems: 'baseline'}}>
                  <T sx={{pr: 1}}>url:</T>
                  <EllipsisTypography
                    sx={{fontSize: '0.8rem', pr: 3, pb: 1}}>{row.url}
                  </EllipsisTypography>
                </FlexRowBox>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  <FlexRowBox sx={{alignItems: 'baseline', pr: 3}}>
                    <strong>사용 언어</strong> :
                    <LanguageTag language={row.language}/>
                  </FlexRowBox>
                  <FlexRowBox sx={{alignItems: 'center', pr: 3}}>
                    <strong>분류</strong> :
                    <CategoryTag category={row.category}/>
                  </FlexRowBox>
                  <Button variant='contained' size='small' sx={{mr: 3}}>
                    상위 페이지 검색
                  </Button>
                  <Button variant='contained' size='small'>
                    하위 페이지 검색
                  </Button>
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  사이트 추적 정보 : {objToTags(row.site_tracking_codes)}
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  개인정보 : {objToTags(row.personal_information)}
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  기타 : {objToTags(row.others)}
                </FlexRowBox>
                <Divider/>
              </FlexColumnBox>
              <Button variant='contained' onClick={() => {
                setOpen(true);
                setSiteInfo(row);
              }}>
                상세보기
              </Button>
            </FlexRowBox>
          </Paper>
        ))
      }
    </>
  )
}


const data = [{
  'id': 0,
  'title': 'Buy Cocaine 96% – Phoenix Market Place',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 1,
  'title': 'hydro chloride for sale online| where can i buy cocaine / New Members Section / Merovech Forum Club',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': ['https://t.me/breastcream', 'https://t.me/breastcream'], 'bitcoin': []}
}, {
  'id': 2,
  'title': 'Page not found | Jar Jar Binks Top100',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': ['jarjarhost@protonmail.com'], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 3,
  'title': 'Buy drugs, anxiety ,pain killers ,psychedelics, anxiety ,pain killers,oxycontin,Nembutal phenobarbital sodium power - ダークちゃんねる+',
  'lang': ['ja', 'en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {
    'email': ['validdocumentpro@protonmail.com', 'validdocumentpro@protonmail.com'],
    'phone': []
  },
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 4,
  'title': 'Buy Drugs - Ecstasy, LSD, Meth, Cocaine, Cannabis, Seeds Cannabis — Marketplace Add link',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': ['drugshop@dnmx.org', 'drugshop@dnmx.org'], 'phone': []},
  'others': {'telegram': [], 'bitcoin': ['15BiCbHPscR6VXnJKkRg2W6UeEFCsjRGjs']}
}, {
  'id': 5,
  'title': 'Buy Drugs - Ecstasy, LSD, Meth, Cocaine, Cannabis, Seeds Cannabis — Ranking of onion sites Links Tor',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 6,
  'title': 'Tag: Buy Cocaine - Pharmacy 42',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 7,
  'title': 'Google site verification  | Webflow University',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {
    'google_analytics': ['UA-34677682-34', 'UA-34677682-34'],
    'google_site_verification': ['vwOCerJqcd24WZR3eoYfzMvYBW2gvsSdkW6CSisWzFA']
  },
  'personal_information': {'email': ['support@webflow.com'], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 8,
  'title': 'Best Place to Buy Cocaine Online - Buy Uncut Pure Grade Cocaine',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': ['johnmilles24@protonmail.com'], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 9,
  'title': 'freebase cocaine for sale online| where can i buy cocaine| - Sand Castle',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': ['caregiver420@protonmail.com', 'caregiver420@protonmail.com'], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 10,
  'title': 'File not found',
  'lang': ['fr'],
  'category': '',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 11,
  'title': '404 — Not Found',
  'lang': ['en'],
  'category': '',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 12,
  'title': 'The Orange',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 13,
  'title': '404 Page Not Found',
  'lang': ['en'],
  'category': '',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': [], 'bitcoin': []}
}, {
  'id': 14,
  'title': 'Buy Cocaine with Delivery. Escrow accepted here. C – Hidden Links',
  'lang': ['en'],
  'category': 'drug',
  'site_tracking_code': {'google_analytics': [], 'google_site_verification': []},
  'personal_information': {'email': [], 'phone': []},
  'others': {'telegram': ['https://t.me/hidden_links'], 'bitcoin': []}
}]
