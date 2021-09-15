const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const pool = require('../db')

beforeEach(async () => {
  await pool.query('DELETE FROM users', [])
  await pool.query('INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3)', ['test1', '$2b$10$WCRFCDDeLmLsVniBCMpxqu5PsaWroe/gF.I.q7E6hF1SvDsZO5gx.', new Date().toISOString().slice(0, 19).replace('T', ' ')])
  await pool.query('INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3)', ['test2', '$2b$10$Mm/ZaJl9MYaaH31mrlhamO5B/2KwpFgt2fVoVMrJX57q7uIqliPyG', new Date().toISOString().slice(0, 19).replace('T', ' ')])
  await pool.query('INSERT INTO users (username, passwordhash, creation_date) VALUES ($1, $2, $3)', ['test3', '$2b$10$G2BZ0LVDeF2N1py9i2vEIetEpPH.tIy6s5bvh91kkZvJsRjLVusiq', new Date().toISOString().slice(0, 19).replace('T', ' ')])
})

describe('login functionality', () => {
  test('unknown user creates new user', async () => {
    const unknownUser = {
      username: 'unknown',
      password: 'unknown'
    }

    await api
      .post('/api/users/login')
      .send(unknownUser)

    const table = await pool.query('SELECT * FROM users', [])
    expect(table.rows).toHaveLength(4)
    expect(table.rows[3].username).toEqual("unknown")
  })
  })

  test('invalid credentials does not allow login', async () => {
    const wrongLogin = {
      username: 'test1',
      password: 'wrong_password'
    }
    await api
      .post('/api/users/login')
      .send(wrongLogin)
      .expect(401)
      .expect('{"error":"invalid username or password"}')
  })

  test('valid credentials allows for login', async () => {
    const correctLogin = {
      username: 'test1',
      password: 'password1'
    }
    
    const res = await api
      .post('/api/users/login')
      .send(correctLogin)
      .expect(200)

    const contents = res.body
    expect(contents).toEqual(
      expect.objectContaining({
        "token": expect.any(String),
        "username": "test1",
      })
    )
  })

describe('token validation', () => {
  test('invalid token raises error', async() =>{
    const res = await api
      .post('/api/users/auth')
      .send({token: 'invalidtoken123'})
      .expect(500)
    
    const contents = res.body
    expect(contents).toEqual(
      expect.objectContaining({
        error: 'invalid signature'
      })
    )
  })

  test('valid token is verified', async() => {
    const login = {
      username: 'test1',
      password: 'password1'
    }
    
    const res = await api
      .post('/api/users/login')
      .send(login)

    const token = res.body.token
    
      await api
      .post('/api/users/auth')
      .send({token: `${token}`})
      .expect(200)
      .expect('"valid"')
  })
})

afterAll(done => {
  pool.end()
  done()
})

