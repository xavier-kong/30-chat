import axios from 'axios'
const url = process.env.BMODE ? process.env.BUILD : process.env.PROD

const joinGroup = async (group_name, passphrase, username, config) => {
    await axios.post(url, {
        group_name,
        passphrase,
        username
    }, config)
}

export default joinGroup