import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import loginPost from '../services/loginPost';
import TransitionAlert from '../components/TransitionAlert';
import useField from '../hooks/useField';

const theme = createTheme();

const SignIn = ({ url, onLogin }) => {
  const [ alert, setAlert ] = useState(null)
  const username = useField('text')
  const password = useField('password')
  
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

    username.onSubmit()
    password.onSubmit()
  };

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
              value={username.value}
              onChange={event => username.onChange(event)}
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
              value={password.value}
              onChange={event => password.onChange(event)}
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
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
              <p>If you don't have an existing account one will be created for you on sign in and you will be logged in automatically</p>
              <p>Note: you cannot change your username or password once your account has been created</p>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default SignIn