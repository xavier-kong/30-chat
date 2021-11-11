import axios from 'axios'

const loginPost = async (url, username, password) => {
    const res = await axios.post(`${url}api/users/login`, {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost