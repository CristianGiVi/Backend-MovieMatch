const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');

const Movie = DataBase.define('Movie', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    tittle: {
        type: Sequelize.STRING(100)
    },
    yearRelease: {
        type: Sequelize.INTEGER
    },
    censorBoardRating: {
        type: Sequelize.STRING(5),
    },
    description: {
        type: Sequelize.TEXT('long')
    },
    length: {
        type: Sequelize.INTEGER
    }
});



module.exports = Movie;