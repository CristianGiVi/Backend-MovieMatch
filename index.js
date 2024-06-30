const Express = require('express');
const Mysql = require('./Database/mysqldb')
const SwaggerJsDoc = require('swagger-jsdoc');
const SwaggerUi = require('swagger-ui-express');
const BodyParser = require("body-parser");
const Cors = require('cors');

// Crear una instancia de la aplicación Express
const app = Express();

// Constantes locales
require('dotenv').config();
// -----------------------------------

// Middlewares para body parser
app.use(BodyParser.urlencoded({ extended: false }));
app.use(BodyParser.json());
// --------------------------------------

// Agregar el middleware de CORS a tu aplicación
app.use(Cors());
// -------------------------

// Rutas
app.use("/", require("./routes/routes.js"));

// -----------------------

// Conexion base de datos
Mysql.sync()
    .then(() => {
        console.log("Conectados a la base de datos")
    })
    .catch(error => {
        console.log(error)
    });

require("./Models/User");
require("./Models/Actor");
require("./Models/Contract");
require("./Models/Movie");
require("./Models/Review");
// ------------------------------------------


// Personalizar pagina 404
app.use(function (request, response) {
    response.status(404).json({
        mensaje: "Error 404 - Pagina no encontrada"
    });
});
// ------------------------------------------

app.listen(process.env.PORT, () => {
    console.log("Backend corriendo con exito en el servidor: " + process.env.PORT)
});