// if user? display logout button and maybe "welcome {username}" in navbar

// toggle between choose old and add new

import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import BinarySelector from '../components/BinarySelector';

const theme = createTheme()

const Groups = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <BinarySelector first="Existing" second="New"/>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Groups