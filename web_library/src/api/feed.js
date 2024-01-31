import axios from '@/api/axios'

const getFeed = apiUrl => {
    return axios.get(apiUrl)
}

const getUserBooks = apiUrl => {
    return axios.get(apiUrl)
}

const deleteBook = book_id => {
    return axios.delete(`delete_book/${book_id}`)
}

export default {
    getFeed,
    getUserBooks,
    deleteBook
}