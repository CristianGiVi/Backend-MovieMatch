// Importación de Express y controladores
const Express = require("express");
const UserController = require('../Controllers/UserController');
const LogInController = require('../Controllers/LogInController');
const MovieController = require('../Controllers/MovieController');
const ReviewController = require('../Controllers/ReviewController');
const Auth = require('../middlewares/auth');

// Creación del enrutador de Express
const Router = Express.Router();

// Ruta base para la aplicación
let PAGE_ROUTE = "/moviematch";

// Users
const SUB_PATH_USER = "users"
Router.get(`${PAGE_ROUTE}/${SUB_PATH_USER}`, UserController.getAllUsers);

// Ruta para registrarse a la aplicación
Router.post(`${PAGE_ROUTE}/join`, UserController.join);

// Inicio de sesión
Router.post(`${PAGE_ROUTE}/login`, LogInController.logIn);

// Películas
const SUB_PATH_MOVIE = "movies"

// Rutas para obtener todas las películas y detalles de una película específica
Router.get(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}`, MovieController.getAllMovies);
Router.get(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}/:id`, MovieController.getMovieDetails);
Router.post(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}/create`, MovieController.createMovie);
Router.delete(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}/:id`, MovieController.deleteMovie);
Router.put(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}/:id`, MovieController.updateMovie);

// Reseñas
const SUB_PATH_REVIEWS= "reviews"

// Rutas para obtener todas las películas reseñadas, todas las reseñas de una película y crear una reseña
Router.get(`${PAGE_ROUTE}/${SUB_PATH_REVIEWS}`, [Auth.authenticateToken], ReviewController.getAllMoviesReviewed);
Router.get(`${PAGE_ROUTE}/${SUB_PATH_REVIEWS}/movie/:id`, ReviewController.getAllReviewsMovie);
Router.post(`${PAGE_ROUTE}/${SUB_PATH_REVIEWS}/create/:movieId`, [Auth.authenticateToken], ReviewController.createReview);
Router.delete(`${PAGE_ROUTE}/${SUB_PATH_REVIEWS}/:reviewId`, [Auth.authenticateToken], ReviewController.deleteReview);

// Exportar el enrutador para usarlo en otros archivos
module.exports = Router;    