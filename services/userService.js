const userModel = require('../models/users');

// Función para obtener todos los usuarios
const getAllUsers = async () => {
  return await userModel.getAllUsers(); // ← Esta debe existir también
};

// Función para crear un nuevo usuario
const createUser = async ({ username, email, password }) => {
  const result = await userModel.createUser({ username, email, password });
  return result;
};

// Función para obtener un usuario por su ID
const getUserById = async (id) => {
  return await userModel.getUserById(id);
};

const findUserByEmail = async (email) => {
  return await userModel.findUserByEmail(email);
};

module.exports = {
  getAllUsers,
  createUser,
  getUserById,
  findUserByEmail
};
