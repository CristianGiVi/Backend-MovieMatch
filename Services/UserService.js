// Importación del modelo User para acceder a la base de datos de usuarios
const User = require("../Models/User");
// Importación de Joi para la validación de datos
const Joi = require("@hapi/joi");
// Importación de bcrypt para encriptar las contraseñas
const bcrypt = require("bcrypt");

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

    // Verificar si ya existe un usuario con el correo proporcionado
    let user = await User.findOne({ email: email });
    if (user) {
      return { message: "Ya existe una cuenta con este correo", status: 400 };
    }

    // Encriptar la contraseña ingresada antes de guardarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con los datos proporcionados
    let newUser = new User({
      email: email,
      password: hashedPassword,
      name: name,
      lastName: lastName,
    });

    // Guardar el nuevo usuario en la base de datos
    let save = await newUser.save();

    // Verificar si se guardó correctamente el nuevo usuario
    if (!save) {
      return {
        message: "Ocurrió un error crear el nuevo usuario",
        status: 500,
      };
    } else {
      return { user: save, status: 201 };
    }
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Función para mostrar todos los usuarios existentes
async function getAllUsers() {
  try {
    let users = await User.find();
    return { users: users, status: 200 };
  } catch (error) {
    return { message: error.message, status: 500 };
  }
}

// Exportar las funciones para su uso en otras partes de la aplicación
module.exports = {
  join,
  getAllUsers,
};
