const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const middleware = require('./utils/middleware')
const usersRouter = require('./routers/usersRouter')
const groupsRouter = require('./routers/groupsRouter')
const path = require('path')

const app = express()

app.use(express.json())
app.use(cors())

app.use(morgan('tiny'))

app.use(express.static('build'))

process.env.PWD = process.cwd();
app.use(express.static(path.join(process.env.PWD, 'build')));

app.use(express.static('build/static'))

app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)

app.use(middleware.unknownEndpoint)

module.exports = app