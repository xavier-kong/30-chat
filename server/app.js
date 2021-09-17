const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const pool = require('./db')
const loginRouter = require('./routers/loginRouter')

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

app.post('/api/users/auth', async(req, res) => {
  const body = req.body
  
  try {
    var cert = await jwt.verify(body.token, process.env.SECRET)
    if (cert) {
      res.status(200).json('valid')
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      error: 'invalid signature'
    })
  }
})

app.use('/api/users/login', loginRouter)

module.exports = app