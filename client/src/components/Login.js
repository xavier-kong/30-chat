import React from 'react'
import useField from '../hooks/useField'
import loginPost from '../services/loginPost'

const Login = ({ onLogin }) => {
  const username = useField('text')
  const password = useField('password')
  
  const userLogin = async (e) => {
    e.preventDefault()
    try {
      if (username.value.length > 1 && password.value.length > 1) {
        const res = await loginPost(username.value, password.value)
        onLogin(JSON.stringify(res.data))
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