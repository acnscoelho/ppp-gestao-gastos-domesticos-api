const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/DashboardController');

// Rota principal do dashboard
router.get('/', dashboardController.getDashboard);

// Rota para obter dados do dashboard via API (para atualizações AJAX)
router.get('/data', dashboardController.getDashboardData);

module.exports = router;
