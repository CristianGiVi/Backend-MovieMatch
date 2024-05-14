// Importación del servicio de inicio de sesión
const LogInServices = require("../Services/LogInService");

// Controlador para la ruta de inicio de sesión
exports.logIn = async (request, response) => {
  try {
    // Obtener el correo electrónico y la contraseña de la solicitud
    const { email, password } = request.body;
    // Llamar al servicio de inicio de sesión para autenticar al usuario
    const data = await LogInServices.logIn(email, password);

    // Verificar si el servicio devolvió un estado diferente de 200 (éxito)
    if (data.status != 200) {
      // Devolver una respuesta con el estado y el mensaje del servicio
      return response
        .status(data.status)
        .json({ mesagge: data.message, status: data.status });
    }

    // Si el servicio devolvió un estado de 200, devolver el token y el estado en la respuesta
    return response.status(200).json({user: data.user, token: data.token, status: data.status});
  } catch (error) {
    return response.status(500).json({ message: error.message, status: 500 });
  }
};
