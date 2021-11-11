import axios from 'axios'

const loginPost = async (url, username, password) => {
    console.log(url)
    const res = await axios.post(url, {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost