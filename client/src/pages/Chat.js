import React, { useState, useEffect, useRef } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box';
import { useParams } from 'react-router'
import configGen from '../services/configGen'
import { useHistory, withRouter } from 'react-router-dom'
import getRoomExp from '../services/getRoomExp';
import List from '@mui/material/List';
import SingleChat from '../components/SingleChat';
import Countdown from 'react-countdown';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

const theme = createTheme()

const Chat = ({ socket, user_name, url }) => {
    const { room_name } = useParams()
    const [ messages, setMessages ] = useState([])
    const config = configGen()
    const [ exp, setExp ] = useState('')
    let history = useHistory()

    useEffect(() => {
        getRoomExp(url, room_name, config)
            .then(res => {
                setExp(res)})
            .then(
                socket.emit('joinRoom', { user_name, room_name })
            )
    }, [])

    const messageListener = (...args) => {
        const newMessages = messages.concat(args[0])
        scrollToBottom()
        setMessages(newMessages)
        socket.off('message', messageListener)
    }

    socket.on('message', messageListener)
 
    const sendMessage = (message) => {
        socket.emit('chat', {
            message,
            user_name,
            room_name
        })
        document.getElementById("form").reset();
    }

    const backToGroups = (e) => {
        e.preventDefault()
        socket.emit('disconnect_room', {
            user_name,
            room_name
        })
        history.push('/groups')
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "auto" })
        }
        //messagesEndRef.current.scrollIntoView({ behavior: "auto" })
    }

    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>This group has expired</span>;
        } else {
            return <span>{room_name} ({hours}:{minutes}:{seconds})</span>;
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    
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
                            {/* header */}
                            <Typography component="h1" variant="h5" align="center" sx={{ mb: 2 }}>
                                {<Countdown date={new Date(exp)} renderer={renderer}/>} 
                            </Typography>


                            <List 
                                sx={{
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    position: 'relative',
                                    overflowY: 'scroll',
                                    minheight: '100%',
                                    maxHeight: 400,
                                    '& ul': { padding: 0 },
                                    mb: 2
                                }}
                                autoFocus={true}
                                placeholder='Type Here!'
                            >
                                {messages
                                .map(message => (
                                    <SingleChat name={message.username} message={message.message}/>
                                ))}
                                <div ref={messagesEndRef} />
                            </List>
                            <TextField id="outlined-basic" variant="outlined" />
                        </Box>
                    </Container>

                        <p>Note to mobile users: send messages by tapping return to keep the onscreen keyboard visible!</p>
                        <button onClick={backToGroups}>Click to go back to groups</button>


                        {/* input box wit button */}
                        <form onSubmit={(e) => {
                            e.preventDefault() 
                            sendMessage(e.target[0].value)
                        }} id='form'>
                        <label>
                            <input 
                                autoFocus
                                defaultValue=''
                                type='text' 
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault()
                                        sendMessage(e.target.value)
                                    }
                        }}/></label><button type="submit">Send</button><br />
                        </form>        

                    {/* create text input with button componenent */}

                    {/* text input then arrow button on the side instead of send */}


                    {/* back button */}
                    
                </Box>
            </Container>
        </ThemeProvider>

    )
}

export default withRouter(Chat)