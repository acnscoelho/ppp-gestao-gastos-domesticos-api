const userService = require('../services/UserService');
const { validateUserData, validateLoginData } = require('../middleware/validation');

class UserController {
    async register(req, res) {
        try {
            const userData = validateUserData(req.body);
            const result = await userService.createUser(userData);
            
            res.status(201).json({
                success: true,
                message: 'Usuário criado com sucesso',
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'VALIDATION_ERROR'
            });
        }
    }

    async login(req, res) {
        try {
            const loginData = validateLoginData(req.body);
            const result = await userService.login(loginData);
            
            res.json({
                success: true,
                message: 'Login realizado com sucesso',
                data: result
            });
        } catch (error) {
            res.status(401).json({
                success: false,
                message: error.message,
                error: 'AUTHENTICATION_ERROR'
            });
        }
    }

    async getProfile(req, res) {
        try {
            const user = await userService.getUserById(req.user.id);
            
            res.json({
                success: true,
                data: user
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'USER_NOT_FOUND'
            });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await userService.getAllUsers();
            
            res.json({
                success: true,
                data: users
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async updateProfile(req, res) {
        try {
            const userData = req.body;
            const updatedUser = await userService.updateUser(req.user.id, userData);
            
            res.json({
                success: true,
                message: 'Perfil atualizado com sucesso',
                data: updatedUser
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'UPDATE_ERROR'
            });
        }
    }

    async deleteProfile(req, res) {
        try {
            await userService.deleteUser(req.user.id);
            
            res.json({
                success: true,
                message: 'Usuário deletado com sucesso'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'USER_NOT_FOUND'
            });
        }
    }
}

module.exports = new UserController();
