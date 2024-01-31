import axios from '@/api/axios'

const getArticle = slug => {
    return axios.get(`/articles/${slug}`)
}

const createArticle = bookData => {
    return axios.post('/create', bookData)
}

export default {
    getArticle,
    createArticle
}

