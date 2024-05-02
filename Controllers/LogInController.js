const LogInServices = require('../Services/LogInService')

exports.logIn = async (request, response)=>{ 
    try{
      const {email, password} = request.body;
      const value = await LogInServices.logIn(email, password);
      if(value.http != 200){
        return response.status(value.http).json(value.message);
      }
      return response.status(200).json({ mesagge: value.message, token: value.token});
    } catch(error) {
      return response.status(400).json({ message: error.message });
    }
  }