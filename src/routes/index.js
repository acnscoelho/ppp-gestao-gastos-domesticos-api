const express = require('express');
const router = express.Router();

// Importar todas as rotas
const userRoutes = require('./userRoutes');
const expenseRoutes = require('./expenseRoutes');
const revenueRoutes = require('./revenueRoutes');
const paymentRoutes = require('./paymentRoutes');
const dashboardRoutes = require('./dashboardRoutes');

// Configurar rotas
router.use('/users', userRoutes);
router.use('/expenses', expenseRoutes);
router.use('/revenues', revenueRoutes);
router.use('/payments', paymentRoutes);
router.use('/dashboard', dashboardRoutes);

// Rota de health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        message: 'API está funcionando',
        timestamp: new Date().toISOString(),
        version: '1.0.0'
    });
});

module.exports = router;
