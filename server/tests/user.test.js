const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const pool = require('../db')

const mockData = [
  {
    username: 'test1',
    passwordhash: '$2b$10$WCRFCDDeLmLsVniBCMpxqu5PsaWroe/gF.I.q7E6hF1SvDsZO5gx.',
    creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    username: 'test2',
    passwordhash: '$2b$10$Mm/ZaJl9MYaaH31mrlhamO5B/2KwpFgt2fVoVMrJX57q7uIqliPyG',
    creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    username: 'test3',
    passwordhash: '$2b$10$G2BZ0LVDeF2N1py9i2vEIetEpPH.tIy6s5bvh91kkZvJsRjLVusiq',
    creation_date: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
]

beforeEach(async() => {
  await pool('users').del()
  mockData.forEach(async(item) => {
    await pool('users').insert(item)
  }
  )
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

    const table = await pool.select().from('users')
    expect(table).toHaveLength(4)
    expect(table[3].username).toEqual("unknown")
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
        "expiry": expect.any(String)
      })
    )
  })

describe('token validation', () => {
  test('invalid token raises error', async() => {
    const res = await api
      .post('/api/users/auth')
      .send({token: 'invalidtoken123'})
      .expect(200)
    
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
  pool.destroy()
  done()
})

