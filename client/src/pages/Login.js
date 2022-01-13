import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginPost from '../services/loginPost';
import TransitionAlert from '../components/TransitionAlert';

/* 
to do:
alert invalid inputs or incorrect username or password to user
login logic
inform user about account management etc
*/

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

const SignIn = ({ url, onLogin }) => {
  const [ alert, setAlert ] = useState(null)

  const handleAlert = (text) => {
    setAlert(text)
    setTimeout(() => {
      setAlert(null)
    }, 5000)
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = new FormData(event.currentTarget);
      const username = data.get('username')
      const password = data.get('password')
      if (username.length > 1 && password.length > 1) {
        const res = await loginPost(url, username, password)
        onLogin(JSON.stringify(res.data))
      } else {
        handleAlert('input not allowed, username and password must both be at least of length 1')
      }
    } catch (error) {
      handleAlert('incorrect username or password')
    }

  };

  /*
  useState to control hide show error message
  handleAlert function
  find way to prevent rerender of login form on alert state change
  */

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {alert ? <TransitionAlert text={alert} severity='error'/>: null}
            {/* add text here explaining how sign in works     
            <p>If you have an existing account you will be logged in</p>
            <p>If you don't have an existing account one will be created for you and you will be logged in automatically</p>
            <p>Note: you cannot change your username or password once your account has been created</p>*/}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignIn