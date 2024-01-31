const fs = require('fs');
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const {User} = require('./user');
const { join } = require('path');

const Book = sequelize.define('Book', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    contact_phone: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    contact_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    image: {
        type: DataTypes.BLOB('long'),
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id',
        },
    },
});

Book.belongsTo(User, { foreignKey: 'userId' });


async function createBooks() {
    try {
        const imagePath = join(__dirname, 'R.png');
        const imageData = fs.readFileSync(imagePath);

        const booksData = [
            {
                title: 'Book 1',
                price: 20.99,
                description: 'Description for Book 1',
                contact_phone: '123-456-7890',
                contact_email: 'email1@example.com',
                userId: 1,
                image: imageData,
            },
            {
                title: 'Book 3',
                price: 26.99,
                description: 'Description for Book 3',
                contact_phone: '123-456-6890',
                contact_email: 'email3@example.com',
                userId: 1,
                image: imageData,
            },
            {
                title: 'Book 4',
                price: 29.99,
                description: 'Description for Book 4',
                contact_phone: '789-456-6890',
                contact_email: 'email4@example.com',
                userId: 1,
                image: imageData,
            },
            {
                title: 'Book 2',
                price: 15.75,
                description: 'Description for Book 2',
                contact_phone: '987-654-3210',
                contact_email: 'email2@example.com',
                userId: 2,
                image: imageData,
            },
            {
                title: 'Book 8',
                price: 19.75,
                description: 'Description for Book 8',
                contact_phone: '987-345-3210',
                contact_email: 'email8@example.com',
                userId: 2,
                image: imageData,
            },
            {
                title: 'Book 10',
                price: 10.0,
                description: 'Description for Book 10',
                contact_phone: '987-456-3210',
                contact_email: 'email10@example.com',
                userId: 2,
                image: imageData,
            },
        ];

        for (const bookData of booksData) {
            const book = await Book.create(bookData);
        }
    } catch (error) {
        console.error('Error creating books:', error);
    }
}

module.exports = {
    Book,
    createBooks
};

