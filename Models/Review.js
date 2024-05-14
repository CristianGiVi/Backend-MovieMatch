// Importación de Sequelize para definir el modelo
const Sequelize = require('sequelize');
// Importación de la instancia de la base de datos
const DataBase = require('../Database/mysqldb');
// Importación de los modelos User y Movie
const User = require('./User');
const Movie = require('./Movie')

// Definición del modelo Review en la base de datos
const Review = DataBase.define('Review', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    rating: {
        type: Sequelize.FLOAT,
        validate: {
            min: 0.0,
            max: 10.0
        }
    },
    comment: {
        type: Sequelize.TEXT('long')
    }
});

// Establecimiento de la relación entre Review y User
Review.belongsTo(User, {
    foreignKey: 'user_id'
});

// Establecimiento de la relación entre Review y Movie
Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

// Exportación del modelo Review para su uso en otras partes de la aplicación
module.exports = Review;
