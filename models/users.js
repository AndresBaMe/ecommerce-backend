const pool = require('../config/db');

// Función para encontrar un usuario por email
const findUserByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  return result.rows[0];  // Devuelve el primer usuario encontrado
};
const getUserById = async (id) => {
  const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0];  // Devuelve el primer usuario encontrado
};

// Función para crear un nuevo usuario
const createUser = async ({ username, email, password }) => {
  const query = `
    INSERT INTO users (user_name, email, password)
    VALUES ($1, $2, $3) RETURNING *;
  `;
  const values = [username, email, password];
  const result = await pool.query(query, values);
  return result.rows[0];  // Devuelve el usuario recién creado
};
const getAllUsers = async () => {
  const result = await pool.query('SELECT * FROM users');
  return result.rows;
};

module.exports = {
  findUserByEmail,
  createUser,
  getUserById,
  getAllUsers,
};
