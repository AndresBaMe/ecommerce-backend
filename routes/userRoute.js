const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Ruta para obtener todos los usuarios
router.get('/', userController.getAllUsers);

// Ruta para crear un nuevo usuario
router.post('/register', userController.createUser); // Uso correcto de createUser

router.post('/login', userController.login);  


// Ruta para obtener un usuario por ID
router.get('/:id', userController.getUserById);



module.exports = router;
