const User = require("../Models/User");
const Joi = require("@hapi/joi");
const jwt = require('jwt-simple');
const moment = require('moment');

async function logIn(email, password){
    try {
        const schema = Joi.object({
            schemaEmail: Joi.string().email().required().messages({'any.required': "El campo email es obligatorio"}),
            schemaPassword: Joi.string().required().messages({'any.required': "El campo password es obligatorio"})
        });
  
        const {error,value} = schema.validate({
            schemaEmail:email,
            schemaPassword:password
        });
  
        if(error){
            return {message: error.details[0].message, http: 400}      
        }
              
        let user = await User.findOne({
            raw:true,
            where:
                {
                  'email':email
                }
        }); 
        
        if(!user){
            return {message: "No existe una cuenta con este correo", http: 400};                
        }

        if(!(password.trim() == user.password.trim())){
          return {message: "La contraseña ingresada es erronea", http: 400};
        }

        let payload = {
        id: user.id,
        email: user.email,
        iat: moment().unix(),
        exp: moment().add(1, 'days').unix()
        };

        let token = jwt.encode(payload, process.env.SECRET);
        return {token: token, message: "Se han ingresado los datos correctametne", http: 200};
  
    } catch (error) {
        return {mensaje: error.mensaje, httpL: 500};           
    }
}
  


module.exports = {
    logIn
}