const ReviewService = require('../Services/ReviewService');
const Auth = require('../middlewares/auth');

exports.getAllMoviesReviewed = async (request, response) => {
    try {
        let {userId} = Auth.getUserData(request);
        const {movies, message, http} = await ReviewService.findAllMoviesReviewed(userId);
        if (!movies) {
            return response.status(http).json({ message: message });
        }
        return response.status(http).json(movies);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }    
}


exports.getAllReviewsMovie = async (request, response) => {
    try {
        const {id} = request.params;
        const {reviews, message, http} = await ReviewService.findAllReviews(id);
        if (!reviews) {
            return response.status(http).json({ message: message });
        }
        return response.status(http).json(reviews);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }    
}


exports.createReview = async (request, response) => {
    try {
        const {movieId} = request.params;
        let {userId} = Auth.getUserData(request);
        const {rating, comment} = request.body;

        const {review, message, http} = await ReviewService.createReview(movieId, userId, rating, comment);
        if (!review) {
            return response.status(http).json({ message: message });
        }
        return response.status(http).json(review);
    } catch (error) {
        return response.status(500).json({ message: error.message });
    }   
}