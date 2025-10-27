const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/PaymentController');
const { authenticateToken } = require('../middleware/auth');

// Rotas para consulta de pagamentos
router.get('/', paymentController.getPayments);
router.get('/summary', paymentController.getPaymentSummary);
router.get('/:id', paymentController.getPaymentById);
router.delete('/:id', authenticateToken, paymentController.deletePayment);

// Rotas específicas do usuário
router.get('/user/me', authenticateToken, paymentController.getUserPayments);

// Rotas para pagamentos de uma despesa específica
router.get('/expense/:expenseId', paymentController.getExpensePayments);

module.exports = router;
