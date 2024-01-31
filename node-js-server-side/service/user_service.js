const User = require('../model/user');
const {hash} = require("bcrypt");
const { UsernameExistException, EmailExistException, AllFieldsRequired } = require("../exceptions/auth_exception");

const createUser = async (userData) => {
    try {
        const { email, password, username, name, surname, place_of_living, telephone, sex } = userData;
        if (!email || !password || !username || !name || !surname || !place_of_living || !telephone || !sex) {
            throw new AllFieldsRequired('All fields required');
        }

        const existingEmailUser = await User.findOne({ where: { email } });
        if (existingEmailUser) {
            throw new EmailExistException('User with this email already exists');
        }

        const existingUsernameUser = await User.findOne({ where: { username } });
        if (existingUsernameUser) {
            throw new UsernameExistException('User with this username already exists');
        }

        const hashedPassword = await hash(password, 10);

        return await User.create({
            email,
            password: hashedPassword,
            username,
            name,
            surname,
            place_of_living,
            telephone,
            sex,
            date_of_registration: new Date(),
            role: 'user'
        });
    } catch (error) {
        throw error;
    }
};

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({
            where: {email: email.toString()},
        })
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

const findUserByUsername = async (username) => {
    try {
        return await User.findOne({
            where: {username: username.toString()},
        })
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

const findUserById = async (userId) => {
    try {
        return await User.findByPk(userId)
    } catch (error) {
        throw new Error('Error finding user by id: ' + error.message);
    }
};

module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    findUserByUsername
};
