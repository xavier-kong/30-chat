import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const Header = ({ text }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" align="center" sx={{ flexGrow: 1 }}>
            {text}
          </Typography>
        </Toolbar>  
      </AppBar>
    </Box>
  );
}

export default Header;