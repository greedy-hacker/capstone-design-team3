import {AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar} from "@mui/material";
import {AccountCircle} from '@mui/icons-material';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import React from "react";
import {logout} from "../../ServerAPICalls/logout";
import {AccountDialog} from "./AccountDialog";

const headersData = [
  {
    label: "메인",
    href: "/",
  },
  {
    label: "수집 목록",
    href: "/result",
  },
  {
    label: "분석 요청",
    href: "/search",
  },
  {
    label: "모니터링",
    href: "/project",
  },
];

export function Header() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [accountDialog, setAccountDialog] = React.useState(false);

  const handleClickMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickAccountInfo = () => {
    handleClose();
    setAccountDialog(true);
  };

  const handleClickLogout = async () => {
    handleClose();
    logout();
    navigate('/login');
  };

  return (
    <>
      <AppBar sx={{display: 'flex', flexDirection: 'row', alignItems: 'center',}} position="sticky">
        <Toolbar>Darkweb Intelligence</Toolbar>
        {headersData.map(({label, href}) => (
          <Button key={label} color='inherit' to={href} component={RouterLink}>{label}</Button>
        ))}
        <Box sx={{marginLeft: 'auto'}}>
          <IconButton size="large" onClick={handleClickMenu} color="inherit">
            <AccountCircle/>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClickAccountInfo}> 계정정보 </MenuItem>
            <MenuItem onClick={handleClickLogout}> 로그아웃 </MenuItem>
          </Menu>
        </Box>
      </AppBar>
      <AccountDialog open={accountDialog} setOpen={setAccountDialog}/>
    </>
  );
}