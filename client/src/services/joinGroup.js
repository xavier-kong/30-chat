import axios from 'axios'

const joinGroup = async (url, group_name, passphrase, username, config) => {
    try {
        const res = await axios.post(`${url}/api/groups/join`, {
            group_name,
            passphrase,
            username
        }, config)

        return res.data
        
    } catch (error) {
        return error.response.data.error;
    }
}

export default joinGroup