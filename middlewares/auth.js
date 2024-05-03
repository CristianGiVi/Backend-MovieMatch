const jwt = require('jwt-simple');
const moment = require('moment');

exports.authenticateToken = (request, response, next) =>{

    if(!request.headers.authorization){
        return response.status(401).json({mensaje: "La peticion no esta autorizada"})
    }

    let token = request.headers.authorization.replace(/Bearer\s+|['"]+/g, '');
    let payload;
    try{
        payload = jwt.decode(token, process.env.SECRET);
        if(payload.exp <= moment().unix()){
            return response.status(401).json({mensaje: "El token ha expirado"})
        }
        
    } catch(error){
        return response.status(401).json({mensaje: "El token no es valido"})
    }

    request.user = payload;
    next();
}

exports.getUserData = (request) =>{
    let token = request.headers.authorization.replace(/Bearer\s+|['"]+/g, '');
    let payload = jwt.decode(token, process.env.SECRET);
    return {userId: payload.id, userEmail: payload.email}
}