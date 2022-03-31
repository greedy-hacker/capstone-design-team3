import {Box, Button, Divider, Paper, Typography} from "@mui/material";
import {FlexColumnBox, FlexRowBox} from "../../SubComponents/LayoutComponents";
import {EllipsisTypography} from "../../SubComponents/TextComponent";
import {CategoryTag, LanguageTag, Tag} from "../../SubComponents/Tag";
import {DialogContainer} from "../../SubComponents/DialogContainer";
import React from "react";


export function MyListView() {
  const data = getSiteInformation()


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
      <DialogContainer open={open} onClose={() => setOpen(false)} title='보고서' buttons={null} maxWidth='lg'>
      </DialogContainer>
      {
        data.map(row => (
          <Paper key={row.id} elevation={3} sx={{p: 1, my: 2}}>
            <FlexRowBox>
              <Box sx={{width: '220px', height: '150px'}}>
                Screenshot Image
              </Box>
              <Divider orientation="vertical" flexItem sx={{mx: 1}}/>
              <FlexColumnBox sx={{flex: 1, minWidth: 0, height: '100%'}}>
                <EllipsisTypography
                  sx={{fontSize: '1.2rem', pr: 3, pb: 1}}><strong>{row.title}</strong></EllipsisTypography>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  <FlexRowBox sx={{alignItems: 'baseline', pr: 3}}>
                    <strong>Language</strong> :
                    {row.lang.map(lang => (
                      <LanguageTag key={lang} language={lang}/>
                    ))}
                  </FlexRowBox>
                  <FlexRowBox sx={{alignItems: 'center', pr: 3}}>
                    <strong>Category</strong> :
                    <CategoryTag category={row.category}/>
                  </FlexRowBox>
                  <Button variant='contained' size='small' sx={{mr: 3}}>
                    Parent Node
                  </Button>
                  <Button variant='contained' size='small'>
                    Children Nodes
                  </Button>
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  Site Tracking Codes : {objToTags(row.site_tracking_code)}
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  Personal Info : {objToTags(row.personal_information)}
                </FlexRowBox>
                <Divider/>
                <FlexRowBox sx={{alignItems: 'center'}}>
                  Others : {objToTags(row.others)}
                </FlexRowBox>
                <Divider/>
              </FlexColumnBox>
              <Button variant='contained' onClick={() => setOpen(true)}>
                Detail
              </Button>
            </FlexRowBox>
          </Paper>
        ))
      }
    </>
  )
}


function getSiteInformation() {
  return data;
}

interface Row {
  id: number;
  title: string;
  lang: string[];
  category: string;
  site_tracking_code: { [key: string]: string[] };
  personal_information: { [key: string]: string[] };
  others: { [key: string]: string[] };
}

const data: Row[] = [{
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
