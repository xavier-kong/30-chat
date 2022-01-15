// if user? display logout button and maybe "welcome {username}" in navbar

import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import BinarySelector from '../components/BinarySelector';

const theme = createTheme()

const Groups = () => {
    const [ select, setSelect ] = useState(true)

    const handleSelect = () => {
        const newSelect = !select
        setSelect(newSelect)
    }

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
                    <BinarySelector first="Existing" second="New" select={select} handleSelect={handleSelect} />
                    <p>
                        {select ? 'existing' : 'new'}
                    </p>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Groups