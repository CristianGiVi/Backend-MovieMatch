// Importación del servicio ReviewService para gestionar las reseñas
const ReviewService = require("../Services/ReviewService");
// Importación del middleware Auth para la autenticación de usuarios
const Auth = require("../middlewares/auth");

// Controlador para la ruta que obtiene todas las películas calificadas por un usuario
exports.getAllMoviesReviewed = async (request, response) => {
  try {
    // Obtener el ID de usuario del token de autenticación
    let { userId } = Auth.getUserData(request);
    // Llamar al servicio para obtener todas las películas revisadas por el usuario
    const data = await ReviewService.findAllMoviesReviewed(userId);

    // Verificar si el servicio devolvió un estado diferente de 200
    if (data.status != 200) {
      return response.status(data.status).json(data.message);
    }
    return response.status(200).json(data.movies);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Controlador para la ruta que obtiene todas las reseñas de una película por su id
exports.getAllReviewsMovie = async (request, response) => {
  try {
    // Obtener el id de la película de los parámetros de la solicitud
    const { id } = request.params;
    // Llamar al servicio para obtener todas las reseñas de la película por su id
    const data = await ReviewService.findAllReviews(id);
    // Verificar si el servicio devolvió un estado diferente de 200
    if (data.status != 200) {
      return response.status(data.status).json(data.message);
    }
    return response.status(200).json(data.reviews);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Controlador para la ruta que crea una nueva reseña para una película
exports.createReview = async (request, response) => {
  try {
    // Obtener el id de la película y los datos de la reseña del cuerpo de la solicitud
    const { movieId } = request.params;
    const { rating, comment } = request.body;
    // Obtener el ID de usuario del token de autenticación
    let { userId } = Auth.getUserData(request);
    // Llamar al servicio para crear una nueva reseña para la película
    const data = await ReviewService.createReview(
      movieId,
      userId,
      rating,
      comment
    );

    // Verificar si el servicio devolvió un estado diferente de 201 (creado)
    if (data.status != 201) {
      return response.status(data.status).json(data.message);
    }

    return response.status(201).json(data.review);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};

// Controlador para eliminar una reseña
exports.deleteReview = async (request, response) => {
    try {
      // Obtener el id de la reseña de los parámetros de la solicitud
      const { reviewId } = request.params;
      // Llamar al servicio para eliminar la reseña
      const data = await ReviewService.deleteReview(reviewId);
  
      // Verificar si el servicio devolvió un estado diferente de 200
      if (data.status != 200) {
        return response.status(data.status).json(data.message);
      }
  
      return response.status(200).json(data.message);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  };
  