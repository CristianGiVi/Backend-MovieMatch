const Express = require("express");
const UserController = require('../Controllers/UserController');
const LogInController = require('../Controllers/LoginController');
const MovieController = require('../Controllers/MovieController');
const Auth = require('../middlewares/auth');

const Router = Express.Router();

let PAGE_ROUTE = "/api";

// Users
const SUB_PATH_USER = "user"

Router.get(`${PAGE_ROUTE}/${SUB_PATH_USER}`, [Auth.authenticateToken],UserController.getAllUsers);
Router.get(`${PAGE_ROUTE}/${SUB_PATH_USER}/:id`, UserController.getOneUser);
Router.post(`${PAGE_ROUTE}/join`, UserController.join);

// Login

Router.post(`${PAGE_ROUTE}/login`, LogInController.logIn);

// Movies
const SUB_PATH_MOVIE = "movie"
Router.get(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}`, MovieController.getAllMovies);
Router.get(`${PAGE_ROUTE}/${SUB_PATH_MOVIE}/:id`, MovieController.getMovieDetails);






module.exports = Router;    