const bcrypt = require('bcrypt')
const pool = require('../db')

const groupsRouter = require('express').Router()

// which functions in chat router

// add function for creation date check to delete group

// add login for token check + validation for routes else deny

groupsRouter.post('/join', async(req, res) => {

  const body = req.body

  if (!body.token) {
    res.status(401).json('Please login to continue')
  }

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

groupsRouter.post('/list', async(req, res) => {
  
  const body = req.body

  if (!body.token) {
    res.status(401).json('Please login to continue')
  }

  const u_uid = await pool('users').select('user_uid').where('username', body.username)

  const groups = await pool('user_groups')
    .join('groups', 'user_groups.group_uid', '=', 'groups.group_uid')
    .select('group_name')
    .where('user_uid', u_uid[0].user_uid)

  const list = groups.map(group => group.group_name)

  res.status(200).json(list)
})

module.exports = groupsRouter
