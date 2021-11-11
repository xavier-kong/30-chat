import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import Login from './components/Login'
import Groups from './components/Groups'
import Chat from './components/Chat'
import axios from 'axios'
const io = require("socket.io-client")
const url = 'https://thirtychat30.herokuapp.com/'

const App = () => {
  const [ user, setUser ] = useState(null)

  useEffect(() => {
    try {
      const userJSON = JSON.parse(localStorage.getItem('loggedInUser'))
      const body = { token: userJSON.token }
      axios
        .post(`${url}api/users/auth`, body)
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
    window.location.href = url
  }

  const socket = io(url)

  return (
    <Router>
      <div className='container'>
        <h1>30 Chat</h1>
         {user ? <p>Currently logged in as {user.username}<button onClick={Logout}>Logout</button></p> : null}
        <Switch>
          <Route path="/chat/:room_name">
            {user ? <Chat socket={socket} user_name={user.username} url={url}/>  : <p>Loading...</p>}
          </Route>
          <Route path="/groups">
            {user === null ? <Redirect to="/login" /> : <Groups username={user.username} socket={socket} url={url}/>}
          </Route>
          <Route path="/login">
            {user === null ? <Login onLogin={onLogin} url={url}/> : <Redirect to="/groups" />}
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
