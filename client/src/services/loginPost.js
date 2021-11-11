import axios from 'axios'
const url = process.env.NODE_ENV === 'test' ? process.env.REACT_APP_PROD : process.env.REACT_APP_BUILD

const loginPost = async (username, password) => {
    console.log(url)
    const res = await axios.post(url, {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost