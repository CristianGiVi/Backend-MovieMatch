const UserServices = require('../Services/UserService')

exports.getAllUsers = async (request, response) => {
    try {
      const users = await UserServices.getAllUsers();
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ mensaje: error.message });
    }
};

exports.getOneUser = async (request, response) => {
  try {
    const {id} = request.params;
    const user = await UserServices.getUserById(id);
    if (!user) {
      return response.status(400).json({ mensaje: 'Usuario no encontrado' });
    }
    return response.status(200).json(user);
  } catch (error) {
    return response.status(400).json({ mensaje: error.message });
  }
  
}

exports.join = async (request, response)=>{ 

  try{
    const {email, password, name, lastName} = request.body;
    const value = await UserServices.join(email, password, name, lastName);
    if(value.http != 201){
      return response.status(value.http).json(value.message);
    }
    return response.status(201).json(value.message);
  } catch(error) {
    return response.status(400).json({ mensaje: error.message });
  }

}

