const express = require('express')
const cors = require('cors')
const app = express()
const pool = require('./db')
const usersRouter = require('./routers/usersRouter')

app.use(express.json())
app.use(cors())

pool.connect((err, client, done) => {
  if (err) throw err
  client.query('SELECT NOW() as now', (err, res) => {
    done()
    if (err) {
      console.log(err.stack)
    } else {
      console.log(`Connected to postgres at time ${res.rows[0].now}`)
    }
  })
})

app.use('/api/users', usersRouter)

module.exports = app