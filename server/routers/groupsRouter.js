const bcrypt = require('bcrypt')
const pool = require('../db')

const groupsRouter = require('express').Router()

// which functions in chat router

// add a get route to get all groups where user is in

// add function for creation date check to delete group

// add login for token check + validation for routes else deny

groupsRouter.post('/join', async(req, res) => {

  const body = req.body

  const q = await pool.select('group_name').from('groups').where('group_name', body.group_name)

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
      const passphraseCorrect = await bcrypt.compare(body.passphrase, group[0].passphrase)
      if (!passphraseCorrect) {
        res.status(401).json({
          error: 'invalid passphrase'
        })
      } else if (passphraseCorrect) {
        const g_uid = group[0].group_uid
        const u_uid = await pool.select('user_uid').from('users').where('username', body.username)
        const l_time = new Date().toISOString().slice(0, 19).replace('T', ' ')
        await pool('user_groups').insert({
          group_uid: g_uid,
          user_uid: u_uid[0].user_uid,
          login_time: l_time
        })

        res.status(200).send(group[0].group_name)
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