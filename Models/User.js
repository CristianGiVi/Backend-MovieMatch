// Importación de Sequelize para definir el modelo
const Sequelize = require('sequelize');
// Importación de la instancia de la base de datos
const DataBase = require('../Database/mysqldb');

// Definición del modelo User en la base de datos
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
    },
    password: {
        type: Sequelize.STRING(100)
    }
});

// Exportación del modelo User para su uso en otras partes de la aplicación
module.exports = User;
