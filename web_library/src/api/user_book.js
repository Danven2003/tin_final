import axios from '@/api/axios'

const getUsersBooks = () => {
    return axios.get('user_book');
};


const deleteUserBook = (book_id) => {
    return axios.delete(`user_book/${book_id}`);
}


export default {
    getUsersBooks,
    deleteUserBook
}