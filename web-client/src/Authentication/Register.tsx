import React from "react";
import {Link as RouterLink} from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import {register} from "../ServerAPICalls/register";
import {Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography} from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {sessionCheck} from "../ServerAPICalls/sessionCheck";


export function RegisterWrapper() {
  const navigate = useNavigate();

  React.useEffect(() => {
    sessionCheck().then((result) => {
      if (result) {
        navigate('/');
      }
    });
  }, [navigate]);

  return (
    <Register/>
  )
}

function Register() {
  const navigate = useNavigate();
  const [userName, setUserName] = React.useState<string>('');
  const [userEmail, setUserEmail] = React.useState<string>('');
  const [userPw, setUserPw] = React.useState<string>('');
  const handleSubmit = async () => {
    const {result, error} = await register(userName, userEmail, userPw);
    console.log(result, error);
    if (result?.status === 201) {
      alert(result.data)
      navigate('/login');
    }
    alert(error.response.data);
  }

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    let setter: any;
    switch (name) {
      case 'userName':
        setter = setUserName;
        break;
      case 'userEmail':
        setter = setUserEmail;
        break;
      case 'userPw':
        setter = setUserPw;
        break;
    }
    setter?.(e.target.value);
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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="User Name"
                name='userName'
                value={userName}
                onChange={handleChange}
                autoFocus
              />
            </Grid>
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login">
                계정이 있다면 로그인을 해주세요.
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}