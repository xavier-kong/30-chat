import axios from "axios"

const userAuth = async (url, userJSON) => {
    const body = { token: userJSON.token }

    const res = await axios.post(`${url}/api/users/auth`, body)

    if (res.data === 'valid') {
        return userJSON
    } else {
        return null
    }
}

export default userAuth