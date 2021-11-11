import axios from 'axios'
const url = process.env.BMODE ? process.env.BUILD : process.env.PROD

const loginPost = async (username, password) => {
    console.log(url)
    const res = await axios.post(url, {
        username: username,
        password: password
      })
      
    return res
}

export default loginPost