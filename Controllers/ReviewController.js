// Importación del servicio ReviewService para gestionar las reseñas
const ReviewService = require('../Services/ReviewService');
// Importación del middleware Auth para la autenticación de usuarios
const Auth = require('../middlewares/auth');

// Controlador para la ruta que obtiene todas las películas revisadas por un usuario
exports.getAllMoviesReviewed = async (request, response) => {
    try {

        // Obtener el ID de usuario del token de autenticación
        let {userId} = Auth.getUserData(request);
        // Llamar al servicio para obtener todas las películas revisadas por el usuario
        const data = await ReviewService.findAllMoviesReviewed(userId);
        // Verificar si el servicio devolvió un estado diferente de 200 (éxito)
        if (data.status != 200) {
            return response.status(data.status).json({ message: data.message, status: data.status });
        }
        return response.status(200).json({movies: data.movies, status: data.status});
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }    
}

// Controlador para la ruta que obtiene todas las reseñas de una película por su id
exports.getAllReviewsMovie = async (request, response) => {
    try {
        // Obtener el id de la película de los parámetros de la solicitud
        const {id} = request.params;
        // Llamar al servicio para obtener todas las reseñas de la película por su id
        const data = await ReviewService.findAllReviews(id);
        // Verificar si el servicio devolvió un estado diferente de 200 (éxito)
        if (data.status != 200) {
            return response.status(data.status).json({ message: data.message, status: data.status });
        }
        return response.status(200).json({reviews: data.reviews, status: 200});
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }    
}

// Controlador para la ruta que crea una nueva reseña para una película
exports.createReview = async (request, response) => {
    try {
        // Obtener el id de la película y los datos de la reseña del cuerpo de la solicitud
        const {movieId} = request.params;
        const {rating, comment} = request.body;
        // Obtener el ID de usuario del token de autenticación
        let {userId} = Auth.getUserData(request);
        // Llamar al servicio para crear una nueva reseña para la película
        const data = await ReviewService.createReview(movieId, userId, rating, comment);
        
        // Verificar si el servicio devolvió un estado diferente de 201 (creado)
        if (data.status != 201) {
            return response.status(data.status).json({ message: data.message, status: data.status });
        }
        
        return response.status(200).json({review: data.review, status:201});
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }   
}