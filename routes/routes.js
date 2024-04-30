const Express = require("express");
const userController = require('../Controllers/UserController')

const Router = Express.Router();

let api_route = "/api";

Router.get(`${api_route}`, userController.get);
Router.get(`${api_route}/1`, userController.getAllUsers);

module.exports = Router;    