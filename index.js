const Express = require('express');
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

// Conexion base de datos con mongodb

require('./Database/Mongodb.js');

// ------------------------------------------


// Personalizar pagina 404
app.use(function (request, response) {
    response.status(404).json("Error 404 - Pagina no encontrada");
});
// ------------------------------------------

app.listen(process.env.PORT, () => {
    console.log("Backend corriendo con exito en el puerto: " + process.env.PORT)
});