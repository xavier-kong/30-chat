import React from 'react';
import useField from './hooks/useField'

const Login = () => {
  const username = useField('text')
  const password = useField('password')

  const userLogin = (e) => {
    e.preventDefault()
    console.log(username.value, password.value)
    console.log('hello')
  }

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={userLogin}>
      <input {...username} /><br />
      <input {...password} /><br />
      <button type="submit">Login</button>
    </form>
    </>
  )
}

const App = () => {
  return (
    <>
    <h1>30 Chat</h1>
    <Login />
    </>
  )
}

export default App;
