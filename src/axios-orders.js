import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://zeven-burger.firebaseio.com/'
});

export default instance;