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
import ChatInput from '../components/ChatInput';
import Button from '@mui/material/Button';

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
                        marginTop: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Container maxWidth="xs">
                        <Box 
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
                                    mb: 1
                                }}
                            >
                                {messages
                                .map(message => (
                                    <SingleChat name={message.username} message={message.message}/>
                                ))}
                                <div ref={messagesEndRef} />
                            </List>
                            <ChatInput sendMessage={sendMessage} backToGroups={backToGroups}/>
                        </Box>
                    </Container>
                </Box>
            </Container>
        </ThemeProvider>

    )
}

export default withRouter(Chat)