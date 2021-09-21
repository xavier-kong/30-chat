import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom"
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
    <Router>
      <>
        <h1>30 Chat</h1>
        <Switch>
          <Route path="/groups">
            <p>Logged In {user.username}  </p>
          </Route>
          <Route path="/home">
            {user ? <p>Logged In {user.username}  </p> : <Redirect to="/login" />}
          </Route>
          <Route path="/login">
            <Login onLogin={onLogin} />
          </Route>
        </Switch>
      </>
    </Router>
  )
}

export default App;
