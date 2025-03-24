const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userService = require('../services/userService');


const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo usuario
const createUser = async (req, res) => {
  const { username, email, password } = req.body;

  // Verificar si los campos requeridos están presentes
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Verificar si el correo ya está registrado
    const existingUser = await userService.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }

    // Cifrar la contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);  // Generar un salt de 10 rondas
    const hashedPassword = await bcrypt.hash(password, salt);  // Cifrar la contraseña

    // Crear el usuario en la base de datos
    const newUser = await userService.createUser({ username, email, password: hashedPassword });

    res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // Verificar si los campos están presentes
  if (!email || !password) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    // Buscar al usuario en la base de datos
    const user = await userService.findUserByEmail(email);
    
    if (!user) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Comparar la contraseña proporcionada con la almacenada (cifrada) en la base de datos
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    // Crear el JWT (JSON Web Token)
    const token = jwt.sign(
      { userId: user.id, email: user.email },  // Payload
      process.env.JWT_SECRET,                   // Clave secreta (almacenada en .env)
      { expiresIn: '1h' }                      // El token expirará en 1 hora
    );

    // Responder con el token JWT
    res.status(200).json({
      message: 'Inicio de sesión exitoso',
      token: token,  // El token JWT es enviado al frontend
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
};

// Exportar la función para que esté disponible en las rutas
module.exports = { createUser,getAllUsers, getUserById,login };
