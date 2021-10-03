import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import { useParams } from 'react-router'

const Chat = ({ socket, user_name }) => {
    const { room_name } = useParams()
    const text = useField('text')
    const [ messages, setMessages ] = useState([])

    // useEffect(() => {
    //     socket.on('message', (data) => {
    //         const newmsg = messages.concat({
    //             username: data.user_name,
    //             message: data.message
    //         })
    //         setMessages(newmsg)
    //     })
    // })

    socket.on('connect', () => {
        console.log(socket.id)
    })

    socket.emit('joinRoom', { user_name, room_name })

    const sendMessage = (e) => {
        e.preventDefault()
        //logic for sending message
    }
    return (
        <div>
            <h1>Chat room for {room_name} "show remaining time countdown here"</h1>
            <p>Place holder for messages</p>
            <form onSubmit={sendMessage}>
            <label><input {...text} onKeyPress={e => {
                if (e.key === 'Enter') {
                    sendMessage()
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