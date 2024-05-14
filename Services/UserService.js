// Importación del modelo User para acceder a la base de datos de usuarios
const User = require("../Models/User");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");

// Función para registrar un nuevo usuario
async function join(email, password, name, lastName) {
  try {
    // Definir el esquema de validación utilizando Joi
    const schema = Joi.object({
      schemaEmail: Joi.string()
        .email()
        .required()
        .messages({ "any.required": "El campo email es obligatorio" }),
      schemaPassword: Joi.string()
        .min(1)
        .required()
        .messages({ "any.required": "El campo password es obligatorio" }),
      schemaName: Joi.string()
        .required()
        .messages({ "any.required": "El campo name es obligatorio" }),
      schemaLastName: Joi.string()
        .required()
        .messages({ "any.required": "El campo lastName es obligatorio" }),
    });

    // Validar los datos de entrada utilizando el esquema definido
    const { error, value } = schema.validate({
      schemaEmail: email,
      schemaPassword: password,
      schemaName: name,
      schemaLastName: lastName,
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

    // Verificar si ya existe un usuario con el correo proporcionado
    if (user) {
      return { message: "Ya existe una cuenta con este correo", status: 400 };
    }

    // Crear un nuevo usuario en la base de datos
    let save = await User.create({
      email: email,
      password: password,
      name: name,
      lastName: lastName,
    });

    // Verificar si se guardó correctamente el nuevo usuario
    if (!save) {
      return { message: "Ocurrio un error al guardar", status: 500 };
    } else {
      return { message: "Se ha creado el registro exitosamente", status: 201 };
    }
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Exportar la función join para su uso en otras partes de la aplicación
module.exports = {
  join,
};
