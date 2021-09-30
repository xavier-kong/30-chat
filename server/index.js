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

io.on('connection', (socket) => {
  console.log('A user connected with socket id of ', socket.id)

  socket.on('disconnect', () => {
    console.log('A user disconnected')
  })
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

