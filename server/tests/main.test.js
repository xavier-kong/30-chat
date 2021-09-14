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
  test('unknown user returns not found', async () => {
    const unknownUser = {
      username: 'unknown',
      password: 'unknown'
    }

    await api
      .post('/api/users/login')
      .send(unknownUser)
      .expect(404)
      .expect('"user not found"')
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
})

describe('new user creation functionality', () => {
  test('cannot create new user if username already taken', async () => {
    const existingUser = {
      username: 'test1',
      password: 'password1'
    }

    await api
      .post('/api/users/create')
      .send(existingUser)
      .expect(405)
      .expect('"user already exists"')
  })

  test('new user can be created', async () => {
    const newUser = {
      username: 'test4',
      password: 'password4'
    }

    await api
      .post('/api/users/create')
      .send(newUser)
      .expect(201)
      .expect('"new user created"')

    const table = await pool.query('SELECT * FROM users', [])
    expect(table.rows).toHaveLength(4)
    expect(table.rows[3].username).toEqual("test4")
  })
})

afterAll(done => {
  pool.end()
  done()
})

