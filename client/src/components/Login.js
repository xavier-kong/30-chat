import React from 'react'
import useField from '../hooks/useField'
import axios from 'axios'

const Login = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('password')
  
  const userLogin = async (e) => { //refactor services then add to tests
    e.preventDefault()
    try {
      if (username.value.length > 1 && password.value.length > 1) {
        const res = await axios.post('http://localhost:3001/api/users/login', {
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(res.data)
      )
      onLogin()
      } else {
        console.log('input not allowed') //change later 
      }
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
      <label>Username: <input {...username} /></label><br />
      <label>Password: <input {...password} /></label><br />
      <button type="submit">Enter</button>
    </form>
    </>
  )
}

export default Login