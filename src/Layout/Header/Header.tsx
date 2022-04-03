import {AppBar, Button, Toolbar} from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';

const headersData = [
  {
    label: "메인",
    href: "/",
  },
  {
    label: "분석 결과",
    href: "/result",
  },
  {
    label: "분석 요청",
    href: "/search",
  },
];

export function Header() {
  return (
    <AppBar sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', }} position="sticky">
      <Toolbar>Darkweb Intelligence</Toolbar>
      {headersData.map(({label, href}) => (
        <Button key={label} color='inherit' to={href} component={RouterLink}>{label}</Button>
      ))}
    </AppBar>
  );
}