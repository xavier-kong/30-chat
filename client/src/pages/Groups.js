// if user? display logout button and maybe "welcome {username}" in navbar

import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import BinarySelector from '../components/BinarySelector';
import Typography from '@mui/material/Typography';
import GroupFrom from '../components/GroupForm';

const theme = createTheme()

const Groups = () => {
    const [ stage, setStage ] = useState('Pre')

    const handleSelect = (text) => {
        setStage(text)
    }

    // need a back button

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
                {stage === 'Pre' ?
                <>
                    <BinarySelector first="Existing" second="New" handleSelect={handleSelect} />
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
                    <p>Click "EXISTING" to enter a group you have joined before.</p>
                    <p>Click "NEW" to enter/create a new group.</p>
                    </Typography>
                </>
                : 
                stage === 'Existing' ?
                <p>Existing</p>
                : 
                stage === 'New' ?
                <>
                    <GroupFrom />
                </>
                :
                null
                }
                    
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Groups