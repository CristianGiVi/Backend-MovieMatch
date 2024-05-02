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
        return {message: error.mensaje, http: 500}; 
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
            return {movie: null, http: 400};
        }

        return {movie: movie, http: 200};

    } catch (error) {
        return {message: error.message, http: 500}; 
    }
}

module.exports = {
    getAllMovies,
    getMovieById
}