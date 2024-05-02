const Express = require("express");
const userController = require('../Controllers/UserController')
const LogInController = require('../Controllers/LoginController')
const Auth = require('../middlewares/auth')

const Router = Express.Router();

let api_route = "/api";

Router.get(`${api_route}`, [Auth.authenticateToken],userController.getAllUsers);
Router.get(`${api_route}/:id`, userController.getOneUser);
Router.post(`${api_route}/join`, userController.join);
Router.post(`${api_route}/login`, LogInController.logIn);

module.exports = Router;    