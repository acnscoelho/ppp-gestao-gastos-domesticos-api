const express = require('express');
const router = express.Router();
const revenueController = require('../controllers/RevenueController');
const { authenticateToken } = require('../middleware/auth');

// Rotas protegidas (requer autenticação)
router.post('/', authenticateToken, revenueController.createRevenue);
router.get('/', authenticateToken, revenueController.getRevenue);
router.put('/', authenticateToken, revenueController.updateRevenue);
router.delete('/', authenticateToken, revenueController.deleteRevenue);
router.get('/summary', authenticateToken, revenueController.getUserRevenueSummary);

// Rota para listar todas as receitas (administrativa)
router.get('/all', authenticateToken, revenueController.getAllRevenues);

// Rota para resumo geral de receitas
router.get('/general-summary', revenueController.getRevenueSummary);

module.exports = router;
