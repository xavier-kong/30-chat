const bcrypt = require('bcrypt')
const pool = require('../db')

const groupsRouter = require('express').Router()

// on join, enter name + pass, 

groupsRouter.post('/join', async(req, res) => {
  const body = req.body

  const q = await pool.select('group_name').from('groups').where('group_name', body.group_name).as('exists')
  if (q.length === 0) {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.passphrase, saltRounds)
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')

    try {
      await pool('groups').insert({
        group_name: body.group_name,
        passphrase: passwordHash,
        creation_date: date
      })
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  } 

  try {
    const group = await pool.select().from('groups').where('group_name', body.group_name)
    if (group) {
      const passwordCorrect = await bcrypt.compare(body.password, group[0].passphrase)
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




module.exports = groupsRouter


// group_uid UUID DEFAULT uuid_generate_v4 () NOT NULL PRIMARY KEY,
// group_name VARCHAR(100) NOT NULL,
// passphrase VARCHAR(200) NOT NULL,
// creation_date TIMESTAMP NOT NULL,