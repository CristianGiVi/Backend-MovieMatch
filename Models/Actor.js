const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');

const Actor = DataBase.define('Actor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: Sequelize.STRING(100)
    },
    lastName: {
        type: Sequelize.STRING(100)
    }
});

module.exports = Actor;