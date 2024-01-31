const { FavouriteBooks, User, Book } = require('../model/favourite_books');

const createFavouriteBook = async (favouriteBookData) => {
    try {
        return await FavouriteBooks.create(favouriteBookData);
    } catch (error) {
        throw new Error('Error creating the favorite book: ' + error.message);
    }
};

const getAllFavouriteBooks = async () => {
    return await FavouriteBooks.findAll();
};

const getFavouriteBookById = async (favouriteBookId) => {
    const favouriteBook = await FavouriteBooks.findByPk(favouriteBookId);
    if (!favouriteBook) {
        throw new Error('Favorite book entry not found');
    }
    return favouriteBook;
};

const updateFavouriteBook = async (favouriteBookId, favouriteBookData) => {
    try {
        const favouriteBook = await FavouriteBooks.findByPk(favouriteBookId);

        if (!favouriteBook) {
            return null;
        }

        const updatedAttributes = {};

        for (const key in favouriteBookData) {
            if (favouriteBookData.hasOwnProperty(key) && favouriteBook[key] !== undefined) {
                updatedAttributes[key] = favouriteBookData[key];
            }
        }

        if (Object.keys(updatedAttributes).length === 0) {
            return favouriteBook;
        }

        const [count] = await FavouriteBooks.update(updatedAttributes, {
            where: { id: favouriteBookId },
        });

        if (count === 0) {
            return null;
        }

        return await FavouriteBooks.findByPk(favouriteBookId);
    } catch (error) {
        throw error;
    }
};

const deleteFavouriteBook = async (userId, bookId) => {
    try {
        // Find the favourite book entry based on userId and bookId
        const favouriteBook = await FavouriteBooks.findOne({
            where: {
                userId: userId,
                bookId: bookId
            }
        });

        if (!favouriteBook) {
            return null;
        }

        await favouriteBook.destroy();

        return favouriteBook;
    } catch (error) {
        throw error;
    }
};

const getFavouriteBooksByUserId = async (userId) => {
    try {
        const user = await User.findByPk(userId);

        if (!user) {
            return null;
        }

        const favouriteBooks = await FavouriteBooks.findAll({
            where: { userId: user.id },
            include: [Book], // Include the associated Book model
        });

        return favouriteBooks;
    } catch (error) {
        throw error;
    }
};

const checkIfUserBookExists = async (userId, bookId) => {
    try {
        // Find the favourite book entry based on userId and bookId
        const favouriteBook = await FavouriteBooks.findOne({
            where: {
                userId: userId,
                bookId: bookId
            }
        });

        return favouriteBook !== null;
    } catch (error) {
        throw new Error('Error checking if the user book exists: ' + error.message);
    }
};

module.exports = {
    createFavouriteBook,
    getAllFavouriteBooks,
    getFavouriteBookById,
    updateFavouriteBook,
    deleteFavouriteBook,
    getFavouriteBooksByUserId,
    checkIfUserBookExists
};
