const app = require('./app')
const http = require('http')

const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
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
      message: `${user_name} has joined the chat`
    })
  })

  socket.on('chat', ({ message, user_name, room_name }) => {
    //add function here to save chat info to database
    console.log('message sent!', message)
    io.to(room_name).emit('message', {
      message,
      username: user_name
    })
  })

  socket.on('disconnect', ({ username, room_name }) => {
    console.log('A user disconnected')

    io.to(room_name).emit('message', {
      message: `${username} has left the chat :(`
    })
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

