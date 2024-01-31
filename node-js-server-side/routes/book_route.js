const express = require('express');
const router = express.Router();
const { getBooksByOffsetAndLimit, getAllBooksCount, getBookById, getBooksByUserId, deleteBook, createBook} = require("../service/book_service");
const {findUserById} = require("../service/user_service");
const {checkIfUserBookExists} = require("../service/favourite_books_service");
const {verify} = require("jsonwebtoken");
const isAuthenticated = require('../middleware/auth_middleware');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


router.get('/', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit, 10);
        const offset = parseInt(req.query.offset, 10);

        const books = await getBooksByOffsetAndLimit(offset, limit);

        const count_books = await getAllBooksCount();

        return res.status(200).json({ books, count_books });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.get('/articles/:id', async (req, res) => {
    try {
        const bookId = parseInt(req.params.id, 10);

        const book = await getBookById(bookId);

        const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;

        let user = null;
        if (token) {
            try {
                const decodedToken = verify(token, 'your_secret_key');
                user = await findUserById(decodedToken.userId);
                const isLiked = await checkIfUserBookExists(user.id, bookId)
                return res.status(200).json({ book: book, isLiked: isLiked });
            } catch (error) {

            }
        }
        return res.status(200).json({ book: book, isLiked: false });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.get('/user_articles', async (req, res) => {
    try {
        const userId = parseInt(req.params.user_id, 10);
        const offset = parseInt(req.query.offset, 10) || 0;
        const limit = parseInt(req.query.limit, 10) || 10;

        const books = await getBooksByOffsetAndLimit(offset, limit, userId);

        books.forEach(book => {
            if (book.image) {
                book.image = `data:image/png;base64,${book.image.toString('base64')}`;
            }
        });

        return res.status(200).json({ books });
    } catch (error) {
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
});

router.post('/create', upload.single('image'), async (req, res) => {
    try {
        const { title, description, price, contact_email, contact_phone } = req.body;

        const newArticle = await createBook({
            title,
            description,
            price,
            contact_email,
            contact_phone,
            image: req.file.buffer
        });

        res.status(201).json(newArticle);
    } catch (error) {
        console.error('Error creating article:', error);
        res.status(500).json({ error: 'An error occurred while creating the article.' });
    }
});

router.delete('/delete_book/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;

        const deletedBook = await deleteBook(id);
        res.status(200).json({ deleteBook: deletedBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/user_book', isAuthenticated, async (req, res) => {
    try {
        const user_id = req.user.userId;

        const usersBooks = await getBooksByUserId(user_id);
        res.status(200).json({ books: usersBooks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/user_book/:id', isAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;

        const userBook = await deleteBook(id);
        res.status(200).json({ book: userBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
