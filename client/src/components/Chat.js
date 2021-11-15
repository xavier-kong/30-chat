import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router'
import configGen from '../services/configGen'
import axios from 'axios'
import { useHistory, withRouter } from 'react-router-dom'

const chatStyle = {
    'overflowY': 'scroll',
    'border':'1px solid black',
    'width':'300px',
    'height':'300px',
    'position':'relative'
}

const Chat = ({ socket, user_name, url }) => {
    const { room_name } = useParams()
    const [ messages, setMessages ] = useState([])
    const config = configGen()
    const [ exp, setExp ] = useState('')
    let history = useHistory()

    useEffect(() => {
        axios
            .post(`${url}api/groups/exp`, {
            group_name: room_name
      }, config)
            .then((res) => {
        setExp(res.data[0].expiry_date)
      })
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
    
    return (
        <div>
            <h3>Chat room for {room_name}</h3>
            <p>This room will expire at {exp}</p>
            <p>Note to mobile users: send messages by tapping return to keep the onscreen keyboard visible!</p>
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
        </div>
    )
}

export default withRouter(Chat)