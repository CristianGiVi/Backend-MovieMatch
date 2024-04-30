const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');
const User = require('../Models/User');
const Movie = require('../Models/Movie')

const Profile = DataBase.define('Profile', {
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

Profile.belongsTo(User, {
    foreignKey: 'user_id'
});

Profile.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

module.exports = Profile;
