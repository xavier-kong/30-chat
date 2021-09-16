import React, { useEffect, useState } from 'react';
import Login from './components/Login'
import axios from 'axios'

const App = () => {
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
  
  const onLogin = () => {
    setUser(JSON.parse(localStorage.getItem('loggedInUser')))
    console.log(user)
  }
  
  return (
    <>
    <h1>30 Chat</h1>
    {user ? <p>Logged In</p> : <Login onLogin={onLogin} />}
    </>
  )
}

export default App;
