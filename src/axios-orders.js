import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-ca476-default-rtdb.firebaseio.com'
});

export default instance;
