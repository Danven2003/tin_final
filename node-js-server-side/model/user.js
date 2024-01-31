const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    place_of_living: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_of_registration: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    sex: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});


async function createUsers() {
    try {
        const usersData = [
            {
                email: 'danven@gmail.com',
                password: '$2a$12$hSqrBohR2JHJBvXLEu41aehm50BumZRbAw71Xqpso.WMgOUzq149G', //12345
                role: 'admin',
                username: 'danven',
                name: 'Dan',
                telephone: '+48 884 84 4444',
                surname: 'Ven',
                place_of_living: 'New York',
                date_of_registration: new Date(),
                sex: 'male'
            },
            {
                email: 'john@example.com',
                password: '$2a$12$knuOa4YZ4CswCjN5g9gXuuQrXf6QOPWc0yumCiRab0issFEbNSPzO',
                role: 'user',
                username: 'johnsmith',
                name: 'John',
                telephone: '+48 884 84 4444',
                surname: 'Smith',
                place_of_living: 'Los Angeles',
                date_of_registration: new Date(),
                sex: 'male'
            },
        ];

        for (const userData of usersData) {
            const user = await User.create(userData);

        }
    } catch (error) {

    }
}

module.exports = {
    User,
    createUsers
}
