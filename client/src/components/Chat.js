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
