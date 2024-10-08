
// Importación del servicio MovieService para obtener y gestionar películas
const MovieService = require("../Services/MovieService");

// Controlador para la ruta que obtiene todas las películas
exports.getAllMovies = async (request, response) => {
  try {
    // Llamar al servicio para obtener todas las películas
    const data = await MovieService.getAllMovies();

    // Verificar si el servicio devolvió un estado diferente de 200
    if (data.status != 200) {
      return response.status(data.status).json(data.message);
    }

    return response.status(200).json(data.movies);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Controlador para la ruta que obtiene los detalles de una película por su id
exports.getMovieDetails = async (request, response) => {
  try {
    // Obtener el id de la película de los parámetros de la solicitud
    const { id } = request.params;
    // Llamar al servicio para obtener los detalles de la película por su id
    const data = await MovieService.getMovieById(id);

    // Verificar si la película no existe
    if (data.status != 200) {
      return response.status(data.status).json(data.message);
    }

    return response.status(200).json(data.movie);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};


/*

{
  "title": "Inception",
  "yearRelease": 2010,
  "censorBoardRating": "PG-13",
  "plot": "A skilled thief is given a chance at redemption if he can successfully plant an idea in someone's mind.",
  "length": 148,
  "genres": ["Sci-Fi", "Action", "Thriller"],
  "actors": ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"]
}

*/

// Controlador para la ruta que crea una nueva película
exports.createMovie = async (request, response) => {
  try {
    // Obtener los datos de la nueva película del cuerpo de la solicitud
    const {title, yearRelease, censorBoardRating, plot, length, genres, actors} = request.body;

    // Llamar al servicio para crear la nueva película
    const data = await MovieService.createMovie(title, yearRelease, censorBoardRating, plot, length, genres, actors);

    // Manejar errores
    if (data.status !== 201) {
      return response.status(data.status).json(data.message);
    }

    // Devolver la película creada
    return response.status(201).json(data.movie);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Controlador para la ruta que elimina una película por su id
exports.deleteMovie = async (request, response) => {
  try {
    const { id } = request.params;

    // Llamar al servicio para eliminar la película
    const data = await MovieService.deleteMovie(id);

    // Manejar errores
    if (data.status !== 200) {
      return response.status(data.status).json(data.message);
    }

    return response.status(200).json(data.message);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};


/*
{
  "title": "Inception",
  "plot": "A skilled thief is given a chance at redemption if he can successfully plant an idea in someone's mind.",
  "length": 148,
}
*/

// Controlador para la ruta que actualiza una película por su id
exports.updateMovie = async (request, response) => {
  try {
    const { id } = request.params;
    const updateData = request.body; // Obtenemos los datos del cuerpo de la solicitud

    // Llamar al servicio para actualizar la película
    const data = await MovieService.updateMovie(id, updateData);

    // Manejar errores
    if (data.status !== 200) {
      return response.status(data.status).json(data.message);
    }

    return response.status(200).json(data.movie);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
