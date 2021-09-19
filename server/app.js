const express = require('express')
const cors = require('cors')
const app = express()
const middleware = require('./utils/middleware')
const usersRouter = require('./routers/usersRouter')
const groupsRouter = require('./routers/groupsRouter')

app.use(express.json())
app.use(cors())

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app