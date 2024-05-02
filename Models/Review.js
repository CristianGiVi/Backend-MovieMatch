const Sequelize = require('sequelize');
const DataBase = require('../Database/mysqldb');
const User = require('./User');
const Movie = require('./Movie')

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

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

Review.belongsTo(Movie, {
    foreignKey: 'movie_id'
});

module.exports = Review;
