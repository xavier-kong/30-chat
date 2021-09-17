const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const usersRouter = require('./routers/usersRouter')
const groupsRouter = require('./routers/groupsRouter')

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)

module.exports = app