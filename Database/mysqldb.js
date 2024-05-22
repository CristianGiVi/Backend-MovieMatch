// Importación de Sequelize para la conexión a la base de datos
const Sequelize = require('sequelize');
// Importación de dotenv para la configuración de variables de entorno
require('dotenv').config();

// Creación de la instancia de la base de datos utilizando Sequelize
const DB = new Sequelize(
    process.env.DB_NAME,    // Nombre de la base de datos obtenido de las variables de entorno
    process.env.DB_USER,    // Usuario de la base de datos obtenido de las variables de entorno
    process.env.DB_PASSWORD,    // Contraseña de la base de datos obtenida de las variables de entorno
    {
        host: 'moviematchdatabase',   // Nombre del servicio Docker como host de la base de datos
        dialect: 'mysql',   // Tipo de dialecto de la base de datos
        port: '3306',   // Puerto de la base de datos
        logging: false, // Deshabilitar los logs de Sequelize
        define:{
            timestamps: false   // Deshabilitar la generación automática de timestamps en los modelos
        },
        pool: {
            max: 5,   // Número máximo de conexiones en el pool
            min: 0,     // Número mínimo de conexiones en el pool
            acquire: 30000,     // Tiempo máximo de adquisición de conexión (en milisegundos)
            idle: 10000     // Tiempo máximo de inactividad de la conexión (en milisegundos)
        }
    }
);

// Exportación de la instancia de la base de datos para su uso en otras partes de la aplicación
module.exports = DB;
