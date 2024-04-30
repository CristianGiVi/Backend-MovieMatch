const Sequalize = require('sequelize');
require('dotenv').config();

const DB = new Sequalize(
    process.env.DB_NAME, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD,
    {
        host:'localhost',
        dialect: 'mysql',
        port: '3306',
        logging: false,
        define:{
            timestamps: false
        },
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

module.exports = DB;