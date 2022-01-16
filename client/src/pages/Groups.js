import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import BinarySelector from '../components/BinarySelector';
import Typography from '@mui/material/Typography';
import GroupFrom from '../components/GroupForm';
import TransitionAlert from '../components/TransitionAlert';
import joinGroup from '../services/joinGroup'
import configGen from '../services/configGen';
import { useHistory, withRouter } from 'react-router-dom'

const theme = createTheme()

const Groups = ({ username, url}) => {
    const [ stage, setStage ] = useState('Pre')
    const [ alert, setAlert ] = useState(null)
    const [ groupList, setGroupList ] = useState([])
    const config = configGen()
    let history = useHistory();

    // refactor the groups use effect thing to services

    const handleSelect = (text) => {
        setStage(text)
    }

    const handleAlert = (text) => {
        setAlert(text)
        setTimeout(() => {
            setAlert(null)
        }, 5000)
    }

    const groupEnter = async (groupname, passphrase) => {
      try {
        if (groupname.length > 1 || passphrase.length > 1) {
          if (!groupList.includes(groupname)) {
            await joinGroup(url, groupname, passphrase,  username, config)
          }
          redirectRoom(groupname)
        } else {
          handleAlert('input not allowed, groupname and passphrase must both be at least of length 1')
        }
      } catch (err) {
        handleAlert(err)
      }
    }

    const redirectRoom = (room_name) => {
      history.push(`/chat/${room_name}`)
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
                <Container maxWidth="xs">
                    <GroupFrom groupEnter={groupEnter}/>
                    {alert ? <TransitionAlert text={alert} severity='error'/>: null}
                </Container>
                :
                null
                }     
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default withRouter(Groups)