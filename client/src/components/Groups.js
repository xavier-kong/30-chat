import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import axios from 'axios'
import configGen from '../services/configGen'

const Groups = ({ username }) => {
    const groupname = useField('text')
    const passphrase = useField('password')
    const [ groupList, setGroupList ] = useState([])
    const config = configGen()

    useEffect(() => {
      const config = configGen()
      axios.post('http://localhost:3001/api/groups/list', {
        username: username
      }, config).then((res) => {
        setGroupList(res.data)
      })
    }, [username])
  
    const groupEnter = async (e) => { //refactor services then add to tests
      e.preventDefault()
      try {
        if (groupname.value.length > 1 && passphrase.value.length > 1) {
          const res = await axios.post('http://localhost:3001/api/groups/join', {
          group_name: groupname.value,
          passphrase: passphrase.value,
          username  
        }, config)
          const newList = groupList.concat(res.data)
          setGroupList(newList)
        } else {
          console.log('input not allowed') //change later 
        }
      } catch (err) {
        console.log(err)
      }
      groupname.onSubmit()
      passphrase.onSubmit()
    }
    
    return (
      <>
      <h1>Join Group</h1>
      <h2>List of groups for </h2>
      {groupList
        .map(group => (
          <>
          <a href={`http://localhost:3000/chat/${group}`} >{group}</a> <br />
          </>
        ))}
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
