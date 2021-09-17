const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const usersRouter = require('./routers/usersRouter')

app.use(express.json())
app.use(cors())

app.use('/api/users', usersRouter)

module.exports = app