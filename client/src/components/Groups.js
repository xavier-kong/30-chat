import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import configGen from '../services/configGen'
import joinGroup from '../services/joinGroup'
import getGroupList from '../services/getGroupList'

const Groups = ({ username, socket }) => {
    const groupname = useField('text')
    const passphrase = useField('password')
    const [ groupList, setGroupList ] = useState([])
    const config = configGen()

    useEffect(() => {
      const config = configGen()
      const res = getGroupList(username, config)
      setGroupList(res)
    }, [username])
  
    const groupEnter = async (e) => {
      e.preventDefault()
      try {
        if (groupname.value.length > 1 && passphrase.value.length > 1) {
          await joinGroup(groupname.value, passphrase.value,  username, config)
          redirectRoom(groupname.value)
        } else {
          console.log('input not allowed') //change later 
        }
      } catch (err) {
        console.log(err)
      }
      groupname.onSubmit()
      passphrase.onSubmit()
    }
    
    const redirectRoom = (room_name) => {
      window.location.href = `http://localhost:3000/chat/${room_name}`
    }

    return (
      <>
      <h1>Join Group</h1>
      <h2>List of groups for {username}</h2>
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
        <label>Group name: <input {...groupname} /></label><br />
        <label>Passphrase: <input {...passphrase} /></label><br />
        <button type="submit">Enter</button>
      </form>
      </>
    )
  }

export default Groups
