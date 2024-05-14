// Importación de Sequelize para definir el modelo
const Sequelize = require('sequelize');
// Importación de la instancia de la base de datos
const DataBase = require('../Database/mysqldb');
// Importación de los modelos Actor y Movie
const Actor = require('../Models/Actor');
const Movie = require('../Models/Movie')

// Definición del modelo Contract en la base de datos
const Contract = DataBase.define('Contract', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

// Establecimiento de la relación entre la tabla Contract y Actor
Contract.belongsTo(Actor, {
    foreignKey: 'actor_id'
});

// Establecimiento de la relación entre Contract y Movie
Contract.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

// Exportación del modelo Contract para su uso en otras partes de la aplicación
module.exports = Contract;
