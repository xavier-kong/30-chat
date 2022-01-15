// if user? display logout button and maybe "welcome {username}" in navbar

// for pc, main screen divide into 2, left side show exisitng groups, right side join group (copy sign in style)
// for mobile, make it toggle between both

import React, { useState } from 'react'
import Divider from '@mui/material/Divider'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme()

const Groups = () => {
    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                
            </Container>
        </ThemeProvider>
    )
}

export default Groups