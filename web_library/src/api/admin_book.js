import axios from '@/api/axios'

const deleteBook = book_id => {
    return axios.delete(`delete_book/${book_id}`)
}

export default {
    deleteBook
}