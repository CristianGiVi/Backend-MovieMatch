const User = require("../Models/User");
const Joi = require("@hapi/joi");

async function getAllUsers() {
    try {
      let users = await User.findAll({
        order: [["id", "desc"]],
      raw: true,
    });

    return users;
  } catch (error) {
    return error;
  }
}

async function getUserById(id) {
  try {
    let user = await User.findOne({
        raw:true,
        where:
        {
            'id':id
        }
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    return error;
  }
}

async function join(email, password, name, lastName) {
  try {
    const schema = Joi.object({
      schemaEmail: Joi.string().email().required().messages({'any.required': "El campo email es obligatorio"}),
      schemaPassword: Joi.string().min(1).required().messages({'any.required': "El campo password es obligatorio"}),
      schemaName: Joi.string().required().messages({'any.required': "El campo name es obligatorio"}),
      schemaLastName: Joi.string().required().messages({'any.required': "El campo lastName es obligatorio"})
    });

    const {error,value} = schema.validate({
      schemaEmail:email,
      schemaPassword:password,
      schemaName: name,
      schemaLastName: lastName
    });

    if(error){
      return {message: error.details[0].message, status: 400}      
    }
            
    let user = await User.findOne({
        raw:true,
        where:
            {
                'email':email
            }
    });     
        
    if(user){
        return {message: "Ya existe una cuenta con este correo", status: 400};                
    }

    let save = await User.create(
      {
          email:email,
          password:password,
          name: name,
          lastName: lastName
      }
    );

    if(!save){
        return {message: "Ocurrio un error al guardar", status: 500}
    }else{
        return {message: "Se ha creado el registro exitosamente", status: 201};
    }
    

  } catch (error) {
    return {mensaje: error.mensaje, status: 500};           
}
}


module.exports = {
    getAllUsers,
    getUserById,
    join
};
