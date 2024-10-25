// Importación del servicio UserService
const UserServices = require("../Services/UserService");

/* 
{
  "email":"email1@gmail.com", 
  "password" : "contraseña1", 
  "name" : "nombre1", 
  "lastName" : "apellido1"
}
*/

// Controlador para la ruta de registro de usuarios
exports.join = async (request, response) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password, name, lastName } = request.body;
    // Llamar a la funcion join del servicio UserService para registrar al usuario
    const data = await UserServices.join(email, password, name, lastName);

    // Verificar si el servicio devolvió un estado diferente de 201
    if (data.status != 201) {
      return response.status(data.status).json(data.message);
    }

    return response.status(201).json(data.user);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};


exports.getAllUsers = async (request, response) => {
  try {
    // Llamar al servicio para obtener todos los usuarios
    const data = await UserServices.getAllUsers();

    // Verificar si el servicio devolvió un estado diferente de 200
    if (data.status != 200) {
      return response.status(data.status).json(data.message)}

    return response.status(200).json(data.users);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};