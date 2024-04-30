const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');
const Actor = require('../Models/Actor');
const Movie = require('../Models/Movie')

const Contract = DataBase.define('Contract', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

Contract.belongsTo(Actor, {
    foreignKey: 'actor_id'
});

Contract.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

module.exports = Contract;
