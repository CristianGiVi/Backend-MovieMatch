const ReviewService = require('../Services/ReviewService');
const Auth = require('../middlewares/auth');

exports.getAllMoviesReviewed = async (request, response) => {
    try {
        let {userId} = Auth.getUserData(request);
        const {movies, message} = await ReviewService.findAllMoviesReviewed(userId);
        if (!movies) {
            return response.status(400).json({ message: message, status: 400 });
        }
        return response.status(200).json(movies);
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }    
}


exports.getAllReviewsMovie = async (request, response) => {
    try {
        const {id} = request.params;
        const {reviews, message} = await ReviewService.findAllReviews(id);
        if (!reviews) {
            return response.status(400).json({ message: message, status: 400 });
        }
        return response.status(200).json(reviews);
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }    
}


exports.createReview = async (request, response) => {
    try {
        const {movieId} = request.params;
        let {userId} = Auth.getUserData(request);
        const {rating, comment} = request.body;

        const {review, message} = await ReviewService.createReview(movieId, userId, rating, comment);
        if (!review) {
            return response.status(400).json({ message: message, status: 400 });
        }
        return response.status(200).json(review);
    } catch (error) {
        return response.status(500).json({ message: error.message, status: 500 });
    }   
}