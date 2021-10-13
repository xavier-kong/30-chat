import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from './components/Login'
import Groups from './components/Groups'
import Chat from './components/Chat'
import axios from 'axios'
const io = require("socket.io-client")

const App = () => {
  const [ user, setUser ] = useState(null)

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
  
  const onLogin = (data) => {
    window.localStorage.setItem(
      'loggedInUser', data
    )
    setUser(JSON.parse(localStorage.getItem('loggedInUser')))
  }

  const Logout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    window.location.href = `http://localhost:3000/`
  }

  const socket = io('localhost:3001')

  // socket.once('connect', () => {
  //   console.log('connected')
  // })

  return (
    <Router>
      <div className='container'>
        <h1>30 Chat</h1>
         {user ? <p>Currently logged in as {user.username}<button onClick={Logout}>Logout</button></p> : null}
        <Switch>
          <Route path="/chat/:room_name">
            {user ? <Chat socket={socket} user_name={user.username} /> : <Redirect to="/login" />}
          </Route>
          <Route path="/groups">
          {user === null ? <Redirect to="/login" /> : <Groups username={user.username} socket={socket}/>}
          </Route>
          <Route path="/login">
            {user === null ? <Login onLogin={onLogin} /> : <Redirect to="/groups" />}
          </Route>
          <Route path="/">
            {user === null ? <Redirect to="/login" /> : <Redirect to="/groups" />}
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
