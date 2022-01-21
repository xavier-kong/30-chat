import React, { useState, useEffect } from 'react'
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
import getGroupsList from '../services/getGroupsList';
import { useHistory, withRouter } from 'react-router-dom'
import GroupsList from '../components/GroupsList';

const theme = createTheme()

const Groups = ({ username, url}) => {
    const [ stage, setStage ] = useState('Pre')
    const [ alert, setAlert ] = useState(null)
    const [ groupList, setGroupList ] = useState([])
    const config = configGen()
    let history = useHistory();

    useEffect(() => {
      const config = configGen()
      getGroupsList(url, username, config).then(res => setGroupList(res))  
    }, [username, url])

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
            const res = await joinGroup(url, groupname, passphrase,  username, config)
            if (res === groupname) {
              redirectRoom(groupname)
            } else {
              handleAlert(res)
            }
          }
        } else {
          handleAlert('input not allowed, groupname and passphrase must both be at least of length 1')
        }
      } catch (err) {
        handleAlert(err.error)
      }
    }

    const redirectRoom = (room_name) => {
      history.push(`/chat/${room_name}`)
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                {stage === 'Pre' ?
                <>
                    <BinarySelector first="Existing" second="New" handleSelect={handleSelect} />
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 6 }}>
                    Click "EXISTING" to enter a group you have joined before. 
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                    Click "NEW" to enter/create a new group.
                    </Typography>

                </>
                : 
                stage === 'Existing' ?
                <GroupsList groupList={groupList} handleSelect={handleSelect} redirectRoom={redirectRoom}/>
                : 
                stage === 'New' ?
                <Container maxWidth="xs">
                    <GroupFrom groupEnter={groupEnter} handleSelect={handleSelect}/>
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