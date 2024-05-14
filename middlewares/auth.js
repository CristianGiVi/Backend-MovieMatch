// Importación de la librería jwt para manejar tokens JWT
const jwt = require('jwt-simple');
// Importación de la librería moment para trabajar con fechas y tiempos
const moment = require('moment');

// Middleware para autenticar el token JWT proporcionado en la solicitud
exports.authenticateToken = (request, response, next) =>{

    // Verificar si la solicitud contiene la cabecera de autorización
    if(!request.headers.authorization){
        return response.status(401).json({mensaje: "La peticion no esta autorizada", status: 401})
    }

    // Obtener el token de la cabecera de autorización
    let token = request.headers.authorization.replace(/Bearer\s+|['"]+/g, '');
    let payload;

    try{
        payload = jwt.decode(token, process.env.SECRET);

        // Verificar si el token ha expirado
        if(payload.exp <= moment().unix()){
            return response.status(401).json({mensaje: "El token ha expirado", status: 401})
        }
        
    } catch(error){
        // Manejar errores al decodificar el token
        return response.status(401).json({mensaje: "El token no es valido", status: 401})
    }

    // Asignar el payload del token decodificado al objeto de solicitud para su uso posterior
    request.user = payload;
    next();
}

// Función para obtener los datos del usuario a partir del token JWT en la cabecera de autorización
exports.getUserData = (request) =>{
    let token = request.headers.authorization.replace(/Bearer\s+|['"]+/g, '');
    let payload = jwt.decode(token, process.env.SECRET);
    return {userId: payload.id, userEmail: payload.email}
}