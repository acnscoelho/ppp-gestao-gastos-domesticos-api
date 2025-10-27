const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/auth');

// Rotas públicas
router.post('/register', userController.register);
router.post('/login', userController.login);

// Rotas protegidas
router.get('/profile', authenticateToken, userController.getProfile);
router.put('/profile', authenticateToken, userController.updateProfile);
router.delete('/profile', authenticateToken, userController.deleteProfile);

// Rotas administrativas (opcional - para listar todos os usuários)
router.get('/', authenticateToken, userController.getAllUsers);

module.exports = router;
