import axios from '@/api/axios'

const likeBook = book_id => {
    return axios.post('like_book', {book_id: book_id});
}

const getLikedBooks = () => {
    return axios.get('like_book');
};

const deleteLikedBook = (book_id) => {
    return axios.delete(`like_book/${book_id}`);
}


export default {
    likeBook,
    getLikedBooks,
    deleteLikedBook
}