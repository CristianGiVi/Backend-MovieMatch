// Importación del modelo User para acceder a la base de datos de Usuarios
const User = require('../Models/User');
// Importación del modelo Review para acceder a la base de datos de Reseñas
const Review = require('../Models/Review');
// Importación del modelo Movie para acceder a la base de datos de películas
const Movie = require('../Models/Movie');
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");

// Función para encontrar todas las películas reseñadas por un usuario
async function findAllMoviesReviewed(userId) {
    try {
        // Buscar todas las reseñas del usuario, incluyendo los detalles de las películas asociadas
        const reviews = await Review.findAll({
            where: { user_id: userId },
            include: [{ model: Movie, required: true }]
        });

        // Verificar si el usuario no tiene películas reseñadas
        if(reviews.length === 0){
            return {message: "El usuario no tiene peliculas reseñadas", status: 404 };
        }

        // Formatear las reseñas en un formato más legible
        const moviesReviewed = reviews.map(review => {
            return {
                movieName: review.Movie.tittle,
                rating: review.rating,
                comment: review.comment
            };
        });

        return {movies: moviesReviewed, status: 200 };
    } catch (error) {
        return { message: error.message, status: 500 };
    }
}

// Función para encontrar todas las reseñas de una película específica
async function findAllReviews(movieId) {
    try {
        // Buscar todas las reseñas asociadas a la película, incluyendo los detalles de los usuarios
        const reviews = await Review.findAll({
            where: { movie_id: movieId },
            include: [{ model: User, required: true }]
        });

        // Verificar si la película no tiene reseñas
        if(reviews.length === 0){
            return {message: "La pelicula no tiene reseñas", status: 404 };
        }

        // Formatear las reseñas en un formato más legible
        const formattedReviews = reviews.map(review => {
            return {
                userName: review.User.name,
                userLastName: review.User.lastName,
                rating: review.rating,
                comment: review.comment
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
            schemaRating: Joi.number().required().messages({'any.required': "El campo rating es obligatorio"}),
            schemaComment: Joi.string().required().messages({'any.required': "El campo comment es obligatorio"})
        });
    
        const {error,value} = schema.validate({
            schemaRating:rating,
            schemaComment:comment
        });

        // Verificar si hubo errores en la validación y devolver un código de estado 400 si es así
        if(error){
            return {message: error.details[0].message, status: 400}      
          }

        // Buscar al usuario con el ID especificado
        let user = await User.findOne({
            raw:true,
            where:
                {
                    'id': userId
                }
        });     
           
        // Verificar si el usuario no existe y devolver un código de estado 400
        if(!user){
            return {message: "No existe un usuario con esta id", status: 400};                
        }

        // Buscar la película con el ID especificado
        let movie = await Movie.findOne({
            raw:true,
            where:
                {
                    'id':movieId
                }
        });
  
        // Verificar si la película no existe y devolver un código de estado 400
        if(!movie) {
            return {message: "No existe una pelicula con esta id", status: 400};
        }

        // Verificar si ya existe una reseña del usuario para esta película y devolver un código de estado 400
        let review = await Review.findOne({
            raw:true,
            where:
                {
                    'movie_id':movieId,
                    'user_id':userId
                }
        });

        if(review){
            return {message: "Ya existe una reseña del usuario para esta pelicula", status: 400};
        }

        // Crear una nueva reseña y devolver un mensaje de éxito junto con un código de estado 201
        let save = await Review.create(
            {
                rating:rating,
                comment:comment,
                movie_id: movieId,
                user_id: userId
            }
          );
      
          if(!save){
              return {message: "Ocurrio un error al guardar", status: 500}
          }else{
              return {review: save, status: 201};
          }

    } catch (error) {
        return {mensaje: error.message, status: 500};           
    }

}




module.exports = {
    findAllMoviesReviewed,
    findAllReviews,
    createReview
}