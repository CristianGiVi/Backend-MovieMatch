const Movie = require("../Models/Movie");
const Joi = require("@hapi/joi");

async function getAllMovies() {
    try {
        let movies = await Movie.findAll({
            order: [["id", "desc"]],
            raw: true,
        });
        return movies;
    } catch (error) {
        return {message: error.mensaje, status: 500}; 
    }
}
  
  async function getMovieById(id) {
    try {
        let movie = await Movie.findOne({
            raw:true,
            where:
                {
                    'id':id
                }
        });
  
        if(!movie) {
            return {movie: null, status: 400};
        }

        return {movie: movie, status: 200};

    } catch (error) {
        return {message: error.message, status: 500}; 
    }
}

module.exports = {
    getAllMovies,
    getMovieById
}