import axios from 'axios'

const getRoomExp = async (url, room_name, config) => {
    const res = await axios.post(`${url}/api/groups/exp`, {
            group_name: room_name
        }, config)
    
    const exp = res.data[0].expiry_date

    return exp
}

export default getRoomExp