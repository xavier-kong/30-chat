import React from 'react'
import { useParams } from 'react-router'

const Chat = () => {
    const { name } = useParams()
    return (
        <div>
            <h1>Chat room for {name}</h1>
        </div>
    )
}

export default Chat


//socket io learning links
//https://www.tutorialspoint.com/socket.io/socket.io_chat_application.htm
//https://github.com/moniba/socketio-chatroom
//https://blog.crowdbotics.com/build-chat-app-with-nodejs-socket-io/
//https://www.section.io/engineering-education/creating-a-real-time-chat-app-with-react-socket-io-with-e2e-encryption/