import axios from 'axios'

const getGroupList = async(username, config) => {
    const res = axios.post('http://localhost:3001/api/groups/list', {
        username: username
      }, config)
      
    return res
}

export default getGroupList