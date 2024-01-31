const express = require('express');
const { createFavouriteBook, getFavouriteBooksByUserId, deleteFavouriteBook } = require("../service/favourite_books_service");
const router = express.Router();
const isAuthenticated = require('../middleware/auth_middleware');

router.post('/', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { book_id } = req.body;
        const currentDate = new Date();
        const newFavouriteBook = await createFavouriteBook({
            date: currentDate,
            userId: user_id,
            bookId: book_id,
        });
        res.status(201).json({ books: newFavouriteBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const favouriteBooks = await getFavouriteBooksByUserId(user_id);
        res.status(200).json({ favouriteBooks: favouriteBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.userId;
        const { id } = req.params;
        const favouriteBooks = await deleteFavouriteBook(user_id, id);
        res.status(200).json({ favouriteBooks: favouriteBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;