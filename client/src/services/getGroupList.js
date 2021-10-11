import axios from 'axios'

const getGroupList = (username, config) => {
    const res = axios.post('http://localhost:3001/api/groups/list', {
        username: username
      }, config).then(res => res)
      
    return res
}

export default getGroupList