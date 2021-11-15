const app = require('./app')
const http = require('http')
require('dotenv').config()

const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'dev' ? 'http://localhost:3000' : process.env.NODE_ENV === 'test' ? 'http://localhost:3000' : 'https://thirtychat30.herokuapp.com',
    methods: ["GET", "POST"]
  }
})

const PORT = process.env.PORT || 3001

//code for socket.io implementation inspired by github.com/ephnjor2021 

io.on('connection', (socket) => {
  console.log('A user connected with socket id of ', socket.id)

  socket.on('joinRoom', ({ user_name, room_name }) => {
    socket.join(room_name)
    console.log(`User ${user_name} joined Room ${room_name} at ${new Date()}`)

    socket.emit('message', {
      message: `Welcome ${user_name}!`,
      username: 'Hal'
    })

    socket.broadcast.to(room_name).emit("message", {
      message: `${user_name} has joined the chat`,
      username: 'Hal'
    })
  })

  socket.on('chat', ({ message, user_name, room_name }) => {
    console.log(`User: "${user_name} sent Message: ${message} in Room: ${room_name} at ${new Date()}`)
    io.to(room_name).emit('message', {
      message,
      username: user_name
    })
  })

  socket.on('disconnect_room', ({ username, room_name }) => {
    console.log('A user disconnected')

    io.to(room_name).emit('message', {
      message: `${username} has left the chat :(`
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

