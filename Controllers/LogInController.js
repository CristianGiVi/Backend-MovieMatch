// Importación del servicio de inicio de sesión
const LogInServices = require("../Services/LogInService");


/*
{
  "email":"email2@gmail.com", 
  "password" : "contraseña1"
}
*/

// Controlador para la ruta de inicio de sesión
exports.logIn = async (request, response) => {
  try {
    // Obtener el correo electrónico y la contraseña de la solicitud
    const { email, password } = request.body;
    // Llamar al servicio de inicio de sesión para autenticar al usuario
    const data = await LogInServices.logIn(email, password);

    // Verifica si el servicio devolvió un estado diferente de 200
    if (data.status != 200) {
      return response.status(data.status).json(data.message);
    }
    return response.status(200).json(data.token);
  } catch (error) {
    return response.status(500).json(error.message);
  }
};