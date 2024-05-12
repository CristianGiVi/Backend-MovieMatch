const MovieService = require('../Services/MovieService');


exports.getAllMovies = async (request, response) => {
    try {
      const movies = await MovieService.getAllMovies();
      return response.status(200).json(movies);
    } catch (error) {
      return response.status(500).json({ mensaje: error.message, status: 500});
    }
};

exports.getMovieDetails = async (request, response) => {
    try {
        const {id} = request.params;
        const {movie, status} = await MovieService.getMovieById(id);
        if (!movie) {
            return response.status(status).json({ message: 'No existe una pelicula con esta id', status: 400 });
        }
        return response.status(200).json(movie);
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }    
}