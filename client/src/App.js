import React from 'react';
import useField from './hooks/useField'
import useCheckbox from './hooks/useCheckbox';

const UserInfoForm = () => {
  const username = useField('text')
  const password = useField('password')
  const remember = useCheckbox('checkbox')
  
  const userLogin = (e) => { 
    e.preventDefault()
    username.onSubmit()
    password.onSubmit()
    remember.onSubmit()
  }

  return (
    <>
    <h1>Enter</h1>
    <p>If you have an existing account you will be logged in</p>
    <p>If you don't have an existing account one will be created for you and you will be logged in automatically</p>
    <form onSubmit={userLogin}>
      Username: <input {...username} /><br />
      Password: <input {...password} /><br />
      <input {...remember} />Remember me for 24 hours<br />
      <button type="submit">Enter</button>
    </form>
    </>
  )
}

const App = () => {
  //useEffect to check if token in local storage as well as valid ? main : login
  return (
    <>
    <h1>30 Chat</h1>
    <UserInfoForm />
    </>
  )
}

export default App;
