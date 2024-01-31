const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const bookRoutes = require('./routes/book_route');
const userRoutes = require('./routes/user_route');
const likeBookRoutes = require('./routes/like_book_route');
const initializePassport = require('./config/passport-config');
const sequelize = require('./config/database'); // Import Sequelize configuration
const {User} = require('./model/user');
const {Book} = require('./model/book');
const {FavouriteBooks} = require('./model/favourite_books');
const { createBooks } = require('./model/book');
const { createUsers } = require('./model/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use('/api/library', bookRoutes);
app.use('/api/library/auth', userRoutes);
app.use('/api/library/like_book', likeBookRoutes);


(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully');

        await User.sync();
        console.log('User model synced with the database');

        await Book.sync();
        console.log('Book model synced with the database');

        await FavouriteBooks.sync();
        console.log('FavouriteBooks model synced with the database');

        await createUsers();
        console.log('Users created');

        await createBooks();
        console.log('Books created');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error syncing models:', error);
    }
})();
