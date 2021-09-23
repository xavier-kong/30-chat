import React from 'react'
import useField from '../hooks/useField'
import axios from 'axios'

const Groups = () => {
    const groupname = useField('text')
    const passphrase = useField('password')
    
    // const groupEnter = async (e) => { //refactor services then add to tests
    //   e.preventDefault()
    //   try {
    //     if (username.value.length > 1 && password.value.length > 1) {
    //       const res = await axios.post('http://localhost:3001/api/users/login', {
    //       username: username.value,
    //       password: password.value
    //     })
  
    //     window.localStorage.setItem(
    //       'loggedInUser', JSON.stringify(res.data)
    //     )
    //     } else {
    //       console.log('input not allowed') //change later 
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }
    //   groupname.onSubmit()
    //   passphrase.onSubmit()
    // }
  
    return (
      <>
      <h1>Enter Group</h1>
      <h2>List of groups placeholder</h2>
      <p>If the group exists you will be allowed in</p>
      <p>If the group does not exist, one will be created and you will be allowed in</p>
      <form >
        <label>Group name: <input {...groupname} /></label><br />
        <label>Passphrase: <input {...passphrase} /></label><br />
        <button type="submit">Enter</button>
      </form>
      </>
    )
  }

export default Groups
