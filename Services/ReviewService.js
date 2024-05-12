const User = require('../Models/User');
const Review = require('../Models/Review');
const Movie = require('../Models/Movie');
const Joi = require("@hapi/joi");

async function findAllMoviesReviewed(userId) {
    try {
        const reviews = await Review.findAll({
            where: { user_id: userId },
            include: [{ model: Movie, required: true }]
        });

        if (!reviews || reviews.length == 0) {
            return { movies: null, message: "No tienes reseñas de películas"};
        }

        const reviewedMovies = reviews.map(review => {
            return {
                movieName: review.Movie.tittle,
                rating: review.rating,
                comment: review.comment
            };
        });

        return {movies: reviewedMovies};
    } catch (error) {
        return {movies: null, message: error.message};
    }
}

async function findAllReviews(movieId) {
    try {
        const reviews = await Review.findAll({
            where: { movie_id: movieId },
            include: [{ model: User, required: true }]
        });

        if (!reviews || reviews.length == 0) {
            return { reviews: null, message: "La película no tiene reseñas", http: 404 };
        }

        const formattedReviews = reviews.map(review => {
            return {
                userName: review.User.name,
                userLastName: review.User.lastName,
                rating: review.rating,
                comment: review.comment
            };
        });

        return { reviews: formattedReviews, message: "Reseñas encontradas", http: 200 };
    } catch (error) {
        return { reviews: null, message: error.message, http: 500 };
    }
}


async function createReview(movieId, userId, rating, comment) {
    try {
        const schema = Joi.object({
            schemaRating: Joi.number().required().messages({'any.required': "El campo rating es obligatorio"}),
            schemaComment: Joi.string().required().messages({'any.required': "El campo comment es obligatorio"}),
            schemaUserId: Joi.number().required().messages({'any.required': "El campo user_id es obligatorio"}),
            schemaMovieId: Joi.number().required().messages({'any.required': "El campo movie_id es obligatorio"})
        });
    
        const {error,value} = schema.validate({
            schemaRating:rating,
            schemaComment:comment,
            schemaUserId: userId,
            schemaMovieId: movieId
        });

        if(error){
            return {review: null, message: error.details[0].message, http: 400}      
          }

        let user = await User.findOne({
            raw:true,
            where:
                {
                    'id': userId
                }
        });     
            
        if(!user){
            return {review: null, message: "No existe un usuario con esta id", http: 400};                
        }

        let movie = await Movie.findOne({
            raw:true,
            where:
                {
                    'id':movieId
                }
        });
  
        if(!movie) {
            return {review: null, message: "No existe una pelicula con esta id", http: 400};
        }

        let review = await Review.findOne({
            raw:true,
            where:
                {
                    'movie_id':movieId,
                    'user_id':userId
                }
        });

        if(review){
            return {review: null, message: "Ya existe una reseña del usuario para esta pelicula", http: 400};
        }


        let save = await Review.create(
            {
                rating:rating,
                comment:comment,
                movie_id: movieId,
                user_id: userId
            }
          );
      
          if(!save){
              return {review: save,message: "Ocurrio un error al guardar", http: 500}
          }else{
              return {review: save, message: "Se ha creado el registro exitosamente", http: 201};
          }

    } catch (error) {
        return {review: null, mensaje: error.mensaje, http: 500};           
    }

}




module.exports = {
    findAllMoviesReviewed,
    findAllReviews,
    createReview
}