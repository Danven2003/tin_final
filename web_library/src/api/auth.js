import axios from '@/api/axios'

const register = credentials => {
    return axios.post('/auth/register', credentials)
}

const login = credentials => {
    return axios.post('/auth/login', credentials)
}

const getCurrentUser = user_id => {
    return axios.get('/auth/user', user_id)
}

const logout = () => {
    return axios.post('/auth/logout')
}

export default {
    register,
    login,
    getCurrentUser,
    logout
}