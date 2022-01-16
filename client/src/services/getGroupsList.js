import axios from 'axios'

const getGroupsList = async (url, username, config) => {
    const result = await axios.post(`${url}/api/groups/list`, {
        username: username
        }, config).then(res => res.data)
    return result 
}

export default getGroupsList