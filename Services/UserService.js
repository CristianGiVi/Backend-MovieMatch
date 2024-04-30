const User = require("../Models/User");

async function getAllUsers() {
  try {
    let users = await User.findAll({
      order: [["id", "desc"]],
      raw: true,
    });

    return users;
  } catch (error) {
    throw error;
  }
}

async function getUserById(userId) {
  try {
    let user = await User.findByPk(userId);

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user;
  } catch (error) {
    throw error;
  }
}


module.exports = {
    getAllUsers,
    getUserById
};
