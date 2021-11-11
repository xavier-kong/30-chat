import axios from 'axios'
const url = process.env.NODE_ENV === 'test' ? process.env.REACT_APP_PROD : process.env.REACT_APP_BUILD

const joinGroup = async (group_name, passphrase, username, config) => {
    await axios.post(url, {
        group_name,
        passphrase,
        username
    }, config)
}

export default joinGroup