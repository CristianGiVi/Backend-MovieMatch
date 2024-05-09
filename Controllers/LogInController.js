const LogInServices = require('../Services/LogInService')

exports.logIn = async (request, response)=>{ 
    try{
      const {email, password} = request.body;
      const value = await LogInServices.logIn(email, password);
      if(value.status != 200){
        return response.status(value.status).json({mesagge: value.message, status: value.status});
      }
      return response.status(200).json({ mesagge: value.message, token: value.token, status: value.status});
    } catch(error) {
      return response.status(400).json({ message: error.message, status: 500});
    }
  }