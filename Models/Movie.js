// Importación de Sequelize para definir el modelo
const Sequelize = require('sequelize');
// Importación de la instancia de la base de datos
const DataBase = require('../Database/mysqldb');

// Definición del modelo Movie en la base de datos
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
    },
    category: {
        type: Sequelize.STRING(100)
    }
});

// Exportación del modelo Movie para su uso en otras partes de la aplicación
module.exports = Movie;