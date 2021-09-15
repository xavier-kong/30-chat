import React from 'react';
import useField from './hooks/useField'
import useCheckbox from './hooks/userCheckbox';

const Login = () => {
  const username = useField('text')
  const password = useField('password')
  const remember = useCheckbox('checkbox')

  const userLogin = (e) => {
    //maybe this component can be reused for create account too?
    //heading, button and anchor content can be changed based on state? (i.e. login or create)
    e.preventDefault()
    console.log(username.value, password.value, remember.value)
    username.onSubmit()
    password.onSubmit()
  }

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={userLogin}>
      Username: <input {...username} /><br />
      Password: <input {...password} /><br />
      <input {...remember} />Remember me for 24 hours<br />
      <button type="submit">Login</button>
      <a href='create.com'>Create account</a>
      
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
