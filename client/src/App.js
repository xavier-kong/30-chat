import React, { useEffect, useState } from 'react';
import useField from './hooks/useField'
import axios from 'axios'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  
  const userLogin = async (e) => { 
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:3001/api/users/login', {
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(res.data)
      )
    } catch (err) {
      console.log(err)
    }
    username.onSubmit()
    password.onSubmit()
  }

  return (
    <>
    <h1>Enter</h1>
    <p>If you have an existing account you will be logged in</p>
    <p>If you don't have an existing account one will be created for you and you will be logged in automatically</p>
    <form onSubmit={userLogin}>
      Username: <input {...username} /><br />
      Password: <input {...password} /><br />
      <button type="submit">Enter</button>
    </form>
    </>
  )
}

const App = () => {
  //useEffect to check if token in local storage as well as valid ? main : login
  //useState to store user data
  const [ user, setUser ] = useState('')

  useEffect(() => {
    try {
      const userJSON = JSON.parse(localStorage.getItem('loggedInUser'))
      const body = { token: userJSON.token }
      axios
        .post('http://localhost:3001/api/users/auth', body)
        .then((res) => {
          if (res.data === 'valid') {
            setUser(userJSON)
          } else {
            setUser(null)
          }
        })
    } catch {
      setUser(null)
    }
  }, [])
  
  return (
    <>
    <h1>30 Chat</h1>
    {user ? <p>Logged In</p> : <Login />}
    </>
  )
}

export default App;
