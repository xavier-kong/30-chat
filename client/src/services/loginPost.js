import axios from 'axios'

const loginPost = async (username, password) => {
    const res = await axios.post('http://localhost:3001/api/users/login', {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost