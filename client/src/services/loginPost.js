import axios from 'axios'

const loginPost = async (username, password) => {
    const res = await axios.post('https://thirtychat30.herokuapp.com/api/users/login', {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost