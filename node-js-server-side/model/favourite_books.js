const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {User} = require('./user');
const {Book} = require('./book');

const FavouriteBooks = sequelize.define('FavouriteBooks', {
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

User.belongsToMany(Book, {
    through: FavouriteBooks,
    foreignKey: 'userId',
    otherKey: 'bookId',
});

Book.belongsToMany(User, {
    through: FavouriteBooks,
    foreignKey: 'bookId',
    otherKey: 'userId',
});

FavouriteBooks.belongsTo(Book, { foreignKey: 'bookId' });

module.exports = {
    FavouriteBooks,
    User,
    Book
};