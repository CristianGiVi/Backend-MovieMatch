const mongoose = require("mongoose");
// Importación del modelo Movie para acceder a la base de datos de películas
const Movie = require("../Models/Movie");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");

// Función para obtener todas las películas
async function getAllMovies() {
  try {
    // Obtener todas las películas de la base de datos
    let movies = await Movie.find().sort({ yearRelease: -1 });
    return { movies: movies, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para obtener una película por su id
async function getMovieById(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: "El id proporcionado no es válido", status: 400 };
    }
    // Buscar la película en la base de datos por su id
    let movie = await Movie.findById(id).lean();

    // Verificar si la película no existe
    if (!movie) {
      return { message: "No hay una película con esta id", status: 404 };
    }

    return { movie: movie, status: 200 };
  } catch (error) {
    // Retornar un mensaje de error en caso de fallo
    return { message: error.message, status: 500 };
  }
}

// Función para crear una nueva película
async function createMovie(title, yearRelease, censorBoardRating, plot, length, genres, actors) {
  try {
    // Definir el esquema de validación utilizando Joi
    const schema = Joi.object({
      schemaTitle: Joi.string().required().max(100).messages({
        "any.required": "El título es obligatorio",
      }),
      schemaYearRelease: Joi.number().required().messages({
        "any.required": "El año de lanzamiento es obligatorio",
      }),
      schemaCensorBoardRating: Joi.string().max(5).required().messages({
        "any.required": "La clasificacion de la pelicula es obligatoria",
      }),
      schemaPlot: Joi.string().allow(null),
      schemaLength: Joi.number().required().messages({
        "any.required": "La longitud es obligatoria",
      }),
      schemaGenres: Joi.array().items(Joi.string()).max(100).required(),
      schemaActors: Joi.array().items(Joi.string()).required().messages({
        "any.required": "Los actores son obligatorios",
      }),
    });

    // Validar los datos de entrada utilizando el esquema definido
    const { error, value } = schema.validate({
      schemaTitle: title,
      schemaYearRelease: yearRelease,
      schemaCensorBoardRating: censorBoardRating,
      schemaPlot: plot,
      schemaLength: length,
      schemaGenres: genres,
      schemaActors: actors
    });

    // Verificar si hay errores de validación
    if (error) {
      return { message: error.details[0].message, status: 400 };
    }

    // Crear una nueva instancia del modelo Movie
    const newMovie = new Movie({
      title: title,
      yearRelease: yearRelease,
      censorBoardRating: censorBoardRating,
      plot: plot,
      length: length,
      genres: genres,
      actors: actors
    });

    // Guardar la película en la base de datos
    const savedMovie = await newMovie.save();

    // Devolver la película guardada y un estado de éxito
    return { movie: savedMovie, status: 201 };
  } catch (error) {
    // Retornar un mensaje de error en caso de fallo
    return { message: error.message, status: 500 };
  }
}


// Función para eliminar una película por su id
async function deleteMovie(id) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: "El id proporcionado no es válido", status: 400 };
    }

    // Eliminar la película de la base de datos
    const result = await Movie.findByIdAndDelete(id);

    // Verificar si la película no existe
    if (!result) {
      return { message: "No hay una película con esta id", status: 400 };
    }

    return { message: "Película eliminada con éxito", status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para actualizar una película por su id
async function updateMovie(id, updateData) {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return { message: "El id proporcionado no es válido", status: 400 };
    }

    // Buscar y actualizar la película en la base de datos
    const updatedMovie = await Movie.findByIdAndUpdate(id, updateData, { new: true });

    // Verificar si la película no existe
    if (!updatedMovie) {
      return { message: "No hay una película con esta id", status: 404 };
    }

    return { movie: updatedMovie, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}


// Exportar las funciones getAllMovies y getMovieById para su uso en otras partes de la aplicación
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
};
