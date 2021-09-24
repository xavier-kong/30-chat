const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../db')

const usersRouter = require('express').Router()

usersRouter.post('/auth', async(req, res) => {
  const body = req.body
  
  try {
    var cert = await jwt.verify(body.token, process.env.SECRET)
    if (cert) {
      res.status(200).json('valid')
    }
  } catch (err) {
    console.log(err)
    res.status(200).json({
      error: 'invalid signature'
    })
  }
})

usersRouter.post('/login', async(req, res) => {
  const body = req.body

  const q = await pool.select('username').from('users').where('username', body.username).as('exists')
  if (q.length === 0) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

    try {
      await pool('users').insert({
        username: body.username,
        passwordhash: passwordHash,
        creation_date: date
      })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  } 

  try {
    const user = await pool.select().from('users').where('username', body.username)
    if (user) {
      const passwordCorrect = await bcrypt.compare(body.password, user[0].passwordhash)
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
          { expiresIn: 86400 }
        )

        var date = new Date();
        date.setDate(date.getDate() + 1);

        res.status(200).send({
          token, 
          username: user[0].username, 
          expiry: date
        })
      }
    } 
  } catch(err) {
    console.log(err)
    res.status(404).json('user not found')
  }
})

module.exports = usersRouter