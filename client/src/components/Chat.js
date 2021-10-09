import React, { useState, useEffect, useRef } from 'react'
import useField from '../hooks/useField'
import { useParams } from 'react-router'

const chatStyle = {
    'overflowY': 'scroll',
    'border':'1px solid black',
    'width':'300px',
    'height':'300px',
    'position':'relative'
}

const Chat = ({ socket, user_name }) => {
    const { room_name } = useParams()
    const text = useField('text')
    const [ messages, setMessages ] = useState([])

    useEffect(() => {
        socket.emit('joinRoom', { user_name, room_name })
    }, [])

    socket.on('message', (data) => {
        const newMessages = messages.concat(data)
        scrollToBottom()
        setMessages(newMessages)
    })    

    const sendMessage = (e) => {
        e.preventDefault()
        socket.emit('chat', {
            message: text.value,
            user_name,
            room_name
        })
        text.onSubmit()
    }

    const backToGroups = (e) => {
        e.preventDefault()
        window.location.href = `http://localhost:3000/groups`
    }

    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "auto" })
  }
    
    return (
        <div>
            <h3>Chat room for {room_name}</h3>
            <p>"show remaining time countdown here"</p>
            <button onClick={backToGroups}>Click to go back to groups</button> 
            <div style={chatStyle}>
            {messages
                .map(message => (
                    <p>
                        {message.username}: {message.message}
                    </p>
                ))}
            <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage}>
            <label><input {...text} onKeyPress={e => {
                if (e.key === 'Enter') {
                    sendMessage(e)
                }
            }}/></label><button type="submit">Send</button><br />
            </form>
        </div>
    )
}

export default Chat


//socket io learning links
//https://www.tutorialspoint.com/socket.io/socket.io_chat_application.htm
//https://github.com/moniba/socketio-chatroom
//https://blog.crowdbotics.com/build-chat-app-with-nodejs-socket-io/
//https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/