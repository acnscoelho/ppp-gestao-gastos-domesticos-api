const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/ExpenseController');
const { authenticateToken } = require('../middleware/auth');

// Rotas para despesas fixas
router.post('/fixed', authenticateToken, expenseController.createFixedExpense);
router.get('/fixed', expenseController.getFixedExpenses);
router.get('/fixed/:id', expenseController.getFixedExpenseById);
router.put('/fixed/:id', authenticateToken, expenseController.updateFixedExpense);
router.delete('/fixed/:id', authenticateToken, expenseController.deleteFixedExpense);

// Rotas para despesas variáveis
router.post('/variable', authenticateToken, expenseController.createVariableExpense);
router.get('/variable', expenseController.getVariableExpenses);
router.get('/variable/:id', expenseController.getVariableExpenseById);
router.put('/variable/:id', authenticateToken, expenseController.updateVariableExpense);
router.delete('/variable/:id', authenticateToken, expenseController.deleteVariableExpense);

// Rotas para pagamentos
router.post('/payment', authenticateToken, expenseController.processPayment);

// Rotas para relatórios
router.get('/summary', expenseController.getFinancialSummary);
router.get('/type/:type', expenseController.getExpensesByType);

module.exports = router;
