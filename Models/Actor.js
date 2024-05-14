// Importación de Sequelize para definir el modelo
const Sequelize = require('sequelize');
// Importación de la instancia de la base de datos
const DataBase = require('../Database/mysqldb');

// Definición del modelo Actor en la base de datos
const Actor = DataBase.define('Actor', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 
    name: {
        type: Sequelize.STRING(100)
    }
});

// Exportación del modelo Actor para su uso en otras partes de la aplicación
module.exports = Actor;