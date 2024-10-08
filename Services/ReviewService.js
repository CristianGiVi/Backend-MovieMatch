const mongoose = require("mongoose");
// Importación del modelo User para acceder a la base de datos de Usuarios
const User = require("../Models/User");
// Importación del modelo Review para acceder a la base de datos de Reseñas
const Review = require("../Models/Review");
// Importación del modelo Movie para acceder a la base de datos de películas
const Movie = require("../Models/Movie");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");

// Función para encontrar todas las películas reseñadas por un usuario
async function findAllMoviesReviewed(userId) {
  try {
    // Buscar todas las reseñas del usuario, incluyendo los detalles de las películas asociadas
    const reviews = await Review.find({ user_id: userId }).populate("movie_id");

    // Formatear las reseñas para devolver los datos requeridos
    const moviesReviewed = reviews.map((review) => {
      return {
        movie: review.movie_id.title,
        rating: review.rating,
        comment: review.comment,
        reviewId: review._id,
      };
    });

    return { movies: moviesReviewed, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para encontrar todas las reseñas de una película específica
async function findAllReviews(movieId) {
  try {
    if (!mongoose.Types.ObjectId.isValid(movieId)) {
      return { message: "El id proporcionado no es válido", status: 400 };
    }
    // Buscar todas las reseñas asociadas a la película, incluyendo los detalles de los usuarios
    const reviews = await Review.find({ movie_id: movieId }).populate(
      "user_id"
    );

    // Formatear las reseñas para devolver los datos requeridos
    const formattedReviews = reviews.map((review) => {
      return {
        userId: review.user_id._id,
        userName: review.user_id.name,
        userLastName: review.user_id.lastName,
        rating: review.rating,
        comment: review.comment,
        reviewId: review._id,
      };
    });

    return { reviews: formattedReviews, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para crear una nueva reseña
async function createReview(movieId, userId, rating, comment) {
  try {
    // Validar los datos de entrada utilizando Joi
    const schema = Joi.object({
      schemaRating: Joi.number()
        .required()
        .messages({ "any.required": "El campo rating es obligatorio" }),
      schemaComment: Joi.string()
        .required()
        .min(3)
        .messages({ "any.required": "El campo comment es obligatorio" }),
    });

    const { error, value } = schema.validate({
      schemaRating: rating,
      schemaComment: comment,
    });

    // Verificar si hubo errores en la validación y devolver un código de estado 400 si es así
    if (error) {
      return { message: error.details[0].message, status: 400 };
    }

    // Verificar si la película no existe
    let movie = await Movie.findById(movieId);
    if (!movie) {
      return { message: "No existe una película con esta id", status: 400 };
    }

    // Verificar si ya existe una reseña del usuario para esta película
    let review = await Review.findOne({
      movie_id: movieId,
      user_id: userId,
    });

    if (review) {
      return {
        message: "Ya existe una reseña del usuario para esta película",
        status: 400,
      };
    }

    // Crear una nueva reseña
    let newReview = new Review({
      rating: rating,
      comment: comment,
      movie_id: movieId,
      user_id: userId,
    });

    // Guardar la nueva reseña en la base de datos
    let save = await newReview.save();

    if (!save) {
      return {
        message: "Ocurrió un error crear la reseña",
        status: 500,
      };
    } else {
      return { review: save, status: 201 };
    }
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para eliminar una reseña por su id
async function deleteReview(reviewId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(reviewId)) {
        return { message: "El id proporcionado no es válido", status: 400 };
      }
  
      // Buscar y eliminar la reseña por su id
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      // Verificar si la reseña existe
      if (!deletedReview) {
        return { message: "No se encontró la reseña", status: 404 };
      }
  
      return { message: "Reseña eliminada correctamente", status: 200 };
    } catch (error) {
      return { message: error.message, status: 500 };
    }
  }
  


module.exports = {
  findAllMoviesReviewed,
  findAllReviews,
  createReview,
  deleteReview,
};
