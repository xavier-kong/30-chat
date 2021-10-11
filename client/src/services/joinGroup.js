import axios from 'axios'

const joinGroup = async (group_name, passphrase, username, config) => {
    const res = await axios.post('http://localhost:3001/api/groups/join', {
        group_name,
        passphrase,
        username
    }, config)
    
    return res.data
}

export default joinGroup