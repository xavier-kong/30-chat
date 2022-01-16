import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import useField from '../hooks/useField';
import Container from '@mui/material/Container'

const GroupFrom = ({ groupEnter, handleSelect }) => {
    const groupname = useField('text')
    const passphrase = useField('password')
  
    const handleSubmit = async(e) => {
        e.preventDefault()
        groupEnter(groupname.value, passphrase.value)
        
        groupname.onSubmit()
        passphrase.onSubmit()
    }

    return (
        <Container maxWidth="xs">
            <Box 
                component="form" 
                noValidate sx={{ 
                    mt: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                onSubmit={handleSubmit}
            >
            <Typography component="h1" variant="h5" sx={{ mb: 1 }}>
                Enter Group
            </Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="groupname"
                    label="Groupname"
                    name="groupname"
                    autoComplete="groupname"
                    autoFocus
                    value={groupname.value}
                    onChange={event => groupname.onChange(event)}
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passphrase"
                    label="Passphrase"
                    type="password"
                    id="passphrase"
                    autoComplete="current-passphrase"
                    value={passphrase.value}
                    onChange={event => passphrase.onChange(event)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                >
                    Sign In
                </Button>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        handleSelect('Pre')
                    }}
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1, mb: 1 }}
                >
                    Go Back
                </Button>
            </Box>
        </Container>
    )
}

export default GroupFrom