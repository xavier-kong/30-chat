const express = require('express')
const cors = require('cors')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const pool = require('./db')

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

//route for api/users/login

app.post('/api/users/login', async(req, res) => {
  const body = req.body

  try {
    const user = await pool.query('SELECT * FROM users WHERE username = $1', [body.username])
    if (user) {
      const passwordCorrect = await bcrypt.compare(body.password, user.rows[0].passwordhash)
      if (!passwordCorrect) {
        res.status(401).json({
          error: 'invalid username or password'
        })
      } else if (passwordCorrect) {
        const userForToken = {
          username: user.username,
          id: user.user_uid
        }

        const token = jwt.sign(
          userForToken,
          process.env.SECRET,
          { expiresIn: body.extendExpiry ? 86400 : 1800 } //expires in 30 minutes by default, user will have choice to be remembered for 24 hours
        )

        res.status(200).send({token, username: user.rows[0].username})
      }
    } 
  } catch(err) {
    console.log(err)
    res.status(404).json('user not found')
  }
})

app.post('/api/users/create', async(req, res) => {
  const body = req.body
  try {
    const q = await pool.query('SELECT 1 AS exists FROM users WHERE username = $1', [body.username])
    if (q.rows[0]) {
      res.status(405).json('user already exists')
    }
    else {
      const body = req.body

      const saltRounds = 10
      const passwordHash = await bcrypt.hash(body.password, saltRounds)
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

      try {
        await pool.query('INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3)', [body.username, passwordHash, date])
        res.status(201).json('new user created')
      } catch (err) {
        console.log(err)
        res.status(500).json(err)
      }
    }
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
})

module.exports = app