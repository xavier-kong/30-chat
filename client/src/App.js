import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from './components/Login'
import Groups from './components/Groups'
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
  }
  
  return (
    <Router>
      <>
        <h1>30 Chat</h1>
        <Switch>
          <Route path="/groups">
          {user === null ? <Redirect to="/login" /> : <Groups username={user.username} />}
          </Route>
          <Route path="/login">
            {user === null ? <Login onLogin={onLogin} /> : <Redirect to="/groups" />}
            
          </Route>
          <Route path="/">
            {user === null ? <Redirect to="/login" /> : <Redirect to="/groups" />}
          </Route>
        </Switch>
      </>
    </Router>
  )
}

export default App;
