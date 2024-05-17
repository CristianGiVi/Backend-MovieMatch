// Importación del modelo User para acceder a la base de datos de usuarios
const User = require("../Models/User");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");
// Importación de jwt para la generación y decodificación de tokens JWT
const jwt = require("jwt-simple");
// Importación de moment para el manejo de fechas y tiempos
const moment = require("moment");

// Función para realizar el proceso de inicio de sesión
async function logIn(email, password) {
  try {
    // Definir el esquema de validación utilizando Joi
    const schema = Joi.object({
      schemaEmail: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "El campo email es obligatorio" }),
      schemaPassword: Joi.string()
        .required()
        .messages({ "any.required": "El campo password es obligatorio" }),
    });

    // Validar los datos de entrada utilizando el esquema definido
    const { error, value } = schema.validate({
      schemaEmail: email,
      schemaPassword: password,
    });

    // Verificar si hay errores de validación
    if (error) {
      return { message: error.details[0].message, status: 400 };
    }

    // Buscar al usuario en la base de datos por su correo electrónico
    let user = await User.findOne({
      raw: true,
      where: {
        email: email,
      },
    });

    // Verificar si el usuario existe en la base de datos
    if (!user) {
      return { message: "No existe una cuenta con este correo", status: 404 };
    }

    // Verificar si la contraseña ingresada coincide con la contraseña almacenada
    if (!(password.trim() == user.password.trim())) {
      return { message: "La contraseña ingresada es erronea", status: 400 };
    }

    // Crear el payload para el token JWT
    let payload = {
      id: user.id,
      email: user.email,
      iat: moment().unix(),
      exp: moment().add(1, "days").unix(),
    };

    // Codificar el payload en un token JWT utilizando la clave secreta
    let token = jwt.encode(payload, process.env.SECRET);

    // Devolver el token generado y un mensaje de éxito
    return { token: token, status: 200};
  } catch (error) {
    return { mesagge: error.mesagge, status: 500 };
  }
}

// Exportar la función logIn para su uso en otras partes de la aplicación
module.exports = {
  logIn,
};
