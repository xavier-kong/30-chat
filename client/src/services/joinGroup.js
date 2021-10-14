import axios from 'axios'

const joinGroup = async (group_name, passphrase, username, config) => {
    await axios.post('https://thirtychat30.herokuapp.com/api/groups/join', {
        group_name,
        passphrase,
        username
    }, config)
}

export default joinGroup