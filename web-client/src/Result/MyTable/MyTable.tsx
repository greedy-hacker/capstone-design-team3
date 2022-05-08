import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {Box, Button, Container} from "@mui/material";

interface Row {
  id: number;
  title: string;
  lang: string[];
  category: string;
  site_tracking_code: { [key: string]: string[] };
  personal_information: { [key: string]: string[] };
  others: { [key: string]: string[] };
}

const columns: GridColDef[] = [
  {field: 'title', headerName: 'Title', width: 150},
  {field: 'lang', headerName: 'Language', width: 150, valueFormatter: ({value}) => JSON.stringify(value)},
  {field: 'category', headerName: 'Category', width: 100},
  {
    field: 'site_tracking_code',
    headerName: 'Site Tracking Code',
    width: 300,
    editable: true,
    valueFormatter: ({value}) => JSON.stringify(value)
  },
  {
    field: 'personal_information',
    headerName: 'Personal Information',
    width: 300,
    editable: true,
    valueFormatter: ({value}) => JSON.stringify(value)
  },
  {
    field: 'others',
    headerName: 'Others',
    width: 300,
    editable: true,
    valueFormatter: ({value}) => JSON.stringify(value)
  },
  {
    field: '', headerName: 'Detail', renderCell: params => (
      <Button variant='outlined'>
        상세보기
      </Button>
    )
  }
];


export function MyTable() {
  return (
    <Box>
      <div style={{height: '70vh', width: '100%'}}>
        <div style={{display: 'flex', height: '100%'}}>
          <div style={{flexGrow: 1}}>
            <DataGrid experimentalFeatures={{newEditingApi: true}} rows={data} columns={columns}/>
          </div>
        </div>
      </div>
    </Box>
  );
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
