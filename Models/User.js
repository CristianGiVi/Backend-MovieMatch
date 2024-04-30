const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');

const User = DataBase.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    email: {
        type: Sequelize.STRING(100)
    },
    name: {
        type: Sequelize.STRING(100)
    },
    lastName: {
        type: Sequelize.STRING(100)
    }
});

module.exports = User;
