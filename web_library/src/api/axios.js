import axios from 'axios'
import {getItem} from "@/helpers/persistanceStorage";

axios.defaults.baseURL = 'http://localhost:3000/api/library'

axios.interceptors.request.use(config => {
    const accessToken = getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

export default axios

