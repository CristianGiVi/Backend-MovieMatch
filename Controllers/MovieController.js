const MovieService = require('../Services/MovieService');


exports.getAllMovies = async (request, response) => {
    try {
      const movies = await MovieService.getAllMovies();
      return response.status(200).json(movies);
    } catch (error) {
      return response.status(400).json({ mensaje: error.message });
    }
};

exports.getMovieDetails = async (request, response) => {
    try {
        const {id} = request.params;
        const {movie, http} = await MovieService.getMovieById(id);
        if (movie) {
            return response.status(http).json({ message: 'Usuario no encontrado' });
        }
        return response.status(200).json(movie);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }    
}