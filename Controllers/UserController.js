const UserServices = require('../Services/UserService')


exports.get= (request, response) => {
    response.status(201).json({ mensaje: "hola" });
}

exports.getAllUsers = async (request, response) => {
    try {
      const users = await UserServices.getAllUsers();
  
      console.log(users);
  
      return response.status(200).json(users);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ mensaje: error.message });
    }
  };