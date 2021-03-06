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

app.use(middleware.tokenExtractor)
app.use('/api/users', usersRouter)
app.use('/api/groups', groupsRouter)

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'/build/index.html'))
})

app.use(middleware.unknownEndpoint)

module.exports = app