// Importación del servicio MovieService para obtener y gestionar películas
const MovieService = require("../Services/MovieService");

// Controlador para la ruta que obtiene todas las películas
exports.getAllMovies = async (request, response) => {
  try {
    // Llamar al servicio para obtener todas las películas
    const data = await MovieService.getAllMovies();

    // Verificar si el servicio devolvió un estado diferente de 201 (creado)
    if (data.status != 200) {
      return response.status(data.status).json({ mesagge: data.message, status: data.status })}

    return response.status(200).json({ data: data.movies, status: 200 });
  } catch (error) {
    return response.status(500).json({ message: error.message, status: 500 });
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
      return response.status(data.status).json({ message: data.message, status: data.status })}

    return response.status(200).json({ data: data.movie, status: 200 });
  } catch (error) {
    return response.status(500).json({ message: error.message, status: 500 });
  }
};
