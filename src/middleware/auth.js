const jwt = require('jsonwebtoken');
const database = require('../config/database');

const JWT_SECRET = process.env.JWT_SECRET || 'sua_chave_secreta_super_segura_2024';

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Token de acesso requerido',
            error: 'MISSING_TOKEN'
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Token inválido ou expirado',
                error: 'INVALID_TOKEN'
            });
        }

        // Verificar se o usuário ainda existe no banco
        const user = database.findUserById(decoded.userId);
        if (!user) {
            return res.status(403).json({
                success: false,
                message: 'Usuário não encontrado',
                error: 'USER_NOT_FOUND'
            });
        }

        req.user = user;
        next();
    });
};

const generateToken = (userId) => {
    return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
};

module.exports = {
    authenticateToken,
    generateToken,
    verifyToken,
    JWT_SECRET
};
