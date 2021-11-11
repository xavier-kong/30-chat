import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import configGen from '../services/configGen'
import joinGroup from '../services/joinGroup'
import axios from 'axios'
const url = process.env.NODE_ENV === 'test' ? process.env.REACT_APP_PROD : process.env.REACT_APP_BUILD

const Groups = ({ username }) => {
    const groupname = useField('text')
    const passphrase = useField('password')
    const [ groupList, setGroupList ] = useState([])
    const config = configGen()

    useEffect(() => {
      const config = configGen()
      axios.post(`${url}api/groups/list`, {
        username: username
        }, config).then(res => setGroupList(res.data))     
    }, [username])
  
    const groupEnter = async (e) => {
      e.preventDefault()
      try {
        if (groupname.value.length > 1 || passphrase.value.length > 1) {
          if (!groupList.includes(groupname.value)) {
            await joinGroup(groupname.value, passphrase.value,  username, config)
          }
          redirectRoom(groupname.value)
        } else {
          alert('input not allowed, groupname and passphrase must both be at least of length 1')
        }
      } catch (err) {
        alert(err)
      }
      groupname.onSubmit()
      passphrase.onSubmit()
    }
    
    const redirectRoom = (room_name) => {
      window.location.href = `${url}chat/${room_name}`
    }

    return (
      <>
      <h1>Join Group</h1>
      {groupList.length > 0 ? <h2>List of groups for {username}</h2>: null}
      {groupList.length > 0 ?
      groupList
        .map(group => (
          <div>
            <button onClick={e => {
              e.preventDefault()
              redirectRoom(group)
              }}>
              Enter chat room for "{group}"
            </button>
          </div>
        )):
        <p>You aren't in any groups...YET :)</p>}
      <p>If the group exists you will be allowed in</p>
      <p>If the group does not exist, one will be created and you will be allowed in</p>
      <form onSubmit={groupEnter}>
        <label>Group name: <input {...groupname} autoFocus/></label><br />
        <label>Passphrase: <input {...passphrase} /></label><br />
        <button type="submit">Enter</button>
      </form>
      </>
    )
  }

export default Groups
