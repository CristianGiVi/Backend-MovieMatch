// Importación del modelo Movie para acceder a la base de datos de películas
const Movie = require("../Models/Movie");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");

// Función para obtener todas las películas
async function getAllMovies() {
  try {
    // Obtener todas las películas ordenadas por id de forma descendente
    let movies = await Movie.findAll({
      order: [["id", "desc"]],
      raw: true,
    });
    return { movies: movies, status: 200 };
  } catch (error) {
    return { message: error.mensaje, status: 500 };
  }
}

// Función para obtener una película por su id
async function getMovieById(id) {
  try {
    // Buscar la película en la base de datos por su id
    let movie = await Movie.findOne({
      raw: true,
      where: {
        id: id,
      },
    });

    // Verificar si la película no existe
    if (!movie) {
      return { message: "No hay una pelicula con esta id", status: 404 };
    }

    return { movie: movie, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Exportar las funciones getAllMovies y getMovieById para su uso en otras partes de la aplicación
module.exports = {
  getAllMovies,
  getMovieById,
};
