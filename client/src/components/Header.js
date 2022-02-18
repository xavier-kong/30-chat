import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';

const Header = ({ username, text, logout }) => {
  const mobile = useMediaQuery('(min-width:600px)');

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Grid container spacing={2}>
            <Grid item xs={4}>    
              {
                username ?
                <Typography variant="h6" component="div" align="left" xs={4}>
                {mobile ? `Hello, ${username}` : username}
                </Typography>
                :
                null
              }
            </Grid>
            <Grid item xs={4}> 
            <Typography variant="h5" component="div" align="center" sx={{ flexGrow: 1 }} xs={4}>
              {text}
            </Typography>
            </Grid>
            <Grid item xs={4}> 
            {  
              username ?
              <Typography variant="h6" component="div" align="right" xs={4}>
                <Button color="inherit" onClick={logout} variant="text">Logout</Button>
              </Typography>
              :
              null
            }
            </Grid>
          </Grid>
        </Toolbar>  
      </AppBar>
    </Box>
  );
}

export default Header;