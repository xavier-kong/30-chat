import axios from 'axios'

const joinGroup = async (url, group_name, passphrase, username, config) => {
    await axios.post(`${url}api/groups/join`, {
        group_name,
        passphrase,
        username
    }, config)
}

export default joinGroup