const User = require('../models/User');
const database = require('../config/database');
const { generateToken } = require('../middleware/auth');

class UserService {
    async createUser(userData) {
        // Verificar se email já existe
        const existingUser = database.findUserByEmail(userData.email);
        if (existingUser) {
            throw new Error('Email já está em uso');
        }

        const user = new User(userData.name, userData.email, userData.password);
        const createdUser = database.createUser(user);
        
        return {
            user: createdUser.toJSON(),
            token: generateToken(createdUser.id)
        };
    }

    async login(loginData) {
        const user = database.findUserByEmail(loginData.email);
        if (!user) {
            throw new Error('Credenciais inválidas');
        }

        if (!user.validatePassword(loginData.password)) {
            throw new Error('Credenciais inválidas');
        }

        return {
            user: user.toJSON(),
            token: generateToken(user.id)
        };
    }

    async getUserById(userId) {
        const user = database.findUserById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        return user.toJSON();
    }

    async getAllUsers() {
        const users = database.getAllUsers();
        return users.map(user => user.toJSON());
    }

    async updateUser(userId, userData) {
        const user = database.findUserById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Verificar se email já existe em outro usuário
        if (userData.email && userData.email !== user.email) {
            const existingUser = database.findUserByEmail(userData.email);
            if (existingUser) {
                throw new Error('Email já está em uso');
            }
        }

        const updatedUser = database.updateUser(userId, userData);
        return updatedUser.toJSON();
    }

    async deleteUser(userId) {
        const user = database.findUserById(userId);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        // Remover receitas do usuário
        const userRevenues = database.revenues.filter(revenue => revenue.userId === userId);
        userRevenues.forEach(revenue => {
            database.deleteRevenue(revenue.id);
        });

        // Remover pagamentos do usuário
        const userPayments = database.payments.filter(payment => payment.userId === userId);
        userPayments.forEach(payment => {
            database.deletePayment(payment.id);
        });

        return database.deleteUser(userId);
    }
}

module.exports = new UserService();
