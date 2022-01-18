import axios from "axios"

const userAuth = (url, userJSON) => {
    const body = { token: userJSON.token }

    axios
        .post(`${url}/api/users/auth`, body)
        .then((res) => {
            if (res.data === 'valid') {
                return userJSON
            } else {
                return null
            }
        })
}

export default userAuth