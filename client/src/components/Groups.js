import React, { useState, useEffect } from 'react'
import useField from '../hooks/useField'
import axios from 'axios'

const Groups = () => {
    const groupname = useField('text')
    const passphrase = useField('password')
    const [ groupList, setGroupList ] = useState=([])

    //use effect to get group list
    //group list store in state
    
    const groupEnter = async (e) => { //refactor services then add to tests
      e.preventDefault()
      try {
        if (groupname.value.length > 1 && passphrase.value.length > 1) {
          const res = await axios.post('http://localhost:3001/api/groups/join', {
          group_name: groupname.value,
          passphrase: passphrase.value
        })
  
        //group list state update with res data

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
      <h2>List of groups placeholder</h2>
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
