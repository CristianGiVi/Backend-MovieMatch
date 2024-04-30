const Express = require("express");
const mysqlController = require('../Controllers/uploadDataBaseController')

const Router = Express.Router();

let api_route = "/api";

Router.get(`${api_route}`, mysqlController.get);
module.exports = Router;    