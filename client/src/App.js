import React, { useEffect, useState } from 'react';
import useField from './hooks/useField'
import useCheckbox from './hooks/useCheckbox';
import axios from 'axios'

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const remember = useCheckbox('checkbox')
  
  const userLogin = async (e) => { 
    e.preventDefault()
    try {
      const res = await axios.post('localhost:3001/api/users/login', {

      })
    } catch {

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
      const userJSON = localStorage.getItem('loggedInUser')
      axios
        .post('localhost:3001/api/users/auth', userJSON.token)
        .then((res) => {
          if (res.data === 'valid') {
            setUser(JSON.parse(userJSON))
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
    <Login />
    </>
  )
}

export default App;
