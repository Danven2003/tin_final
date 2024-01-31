const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('your_database_name', 'your_username', 'your_password', {
    host: 'mysql_db',
    port: 3306,
    dialect: 'mysql'
});
module.exports = sequelize;




