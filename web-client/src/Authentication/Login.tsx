import {Link as RouterLink, useNavigate} from "react-router-dom";
import React from "react";
import {sessionCheck} from "../ServerAPICalls/sessionCheck";
import {login} from "../ServerAPICalls/login";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

export function LoginWrapper() {
  const navigate = useNavigate();

  React.useEffect(() => {
    sessionCheck().then((result) => {
      if (result) {
        navigate('/');
      }
    });
  }, []);

  return (
    <Login/>
  )
}

function Login() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [userPw, setUserPw] = React.useState<string>('');
  const handleSubmit = async () => {
    const {result, error} = await login(userEmail, userPw);
    if (result) {
      navigate('/')
    } else {
      alert(error.response.data);
    }
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    let setter: any;
    switch (name) {
      case 'userEmail':
        setter = setUserEmail;
        break;
      case 'userPw':
        setter = setUserPw;
        break;
    }
    setter?.(value);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline/>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Email Address"
                name='userEmail'
                value={userEmail}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Password"
                type="password"
                name='userPw'
                value={userPw}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
            onClick={handleSubmit}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/register">
                계정이 없다면 회원가입을 해주세요.
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}