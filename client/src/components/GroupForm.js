import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TransitionAlert from './TransitionAlert';
import useField from '../hooks/useField';
import Container from '@mui/material/Container'

const GroupFrom = () => {
    const groupname = useField('text')
    const passphrase = useField('password')
    const [ alert, setAlert ] = useState(null)

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
                type="passphrase"
                id="passphrase"
                autoComplete="current-passphrase"
                value={passphrase.value}
                onChange={event => passphrase.onChange(event)}
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
            </Box>
        </Container>
    )
}

export default GroupFrom