import axios from 'axios'

const joinGroup = async (group_name, passphrase, username, config) => {
    await axios.post('http://localhost:3001/api/groups/join', {
        group_name,
        passphrase,
        username
    }, config)
}

export default joinGroup