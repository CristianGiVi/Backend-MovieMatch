// Importación del servicio UserService para registrar usuarios
const UserServices = require("../Services/UserService");

// Controlador para la ruta de registro de usuarios
exports.join = async (request, response) => {
  try {
    // Obtener los datos del cuerpo de la solicitud
    const { email, password, name, lastName } = request.body;
    // Llamar al servicio UserService para registrar al usuario
    const data = await UserServices.join(email, password, name, lastName);

    // Verificar si el servicio devolvió un estado diferente de 201 (creado)
    if (data.status != 201) {
      return response
        .status(data.status)
        .json({ mesagge: data.message, status: data.status });
    }
    return response
      .status(201)
      .json({ mesagge: data.message, status: data.status });
  } catch (error) {
    return response.status(500).json({ message: error.message, status: 500 });
  }
};
