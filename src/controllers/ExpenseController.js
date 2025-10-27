const expenseService = require('../services/ExpenseService');
const { validateExpenseData, validatePaymentData } = require('../middleware/validation');

class ExpenseController {
    // Fixed Expenses
    async createFixedExpense(req, res) {
        try {
            const expenseData = validateExpenseData(req.body);
            const expense = await expenseService.createFixedExpense(expenseData);
            
            res.status(201).json({
                success: true,
                message: 'Despesa fixa criada com sucesso',
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'VALIDATION_ERROR'
            });
        }
    }

    async getFixedExpenses(req, res) {
        try {
            const expenses = await expenseService.getFixedExpenses();
            
            res.json({
                success: true,
                data: expenses.map(expense => expense.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async getFixedExpenseById(req, res) {
        try {
            const { id } = req.params;
            const expense = await expenseService.getFixedExpenseById(id);
            
            res.json({
                success: true,
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'EXPENSE_NOT_FOUND'
            });
        }
    }

    async updateFixedExpense(req, res) {
        try {
            const { id } = req.params;
            const expenseData = validateExpenseData(req.body);
            const expense = await expenseService.updateFixedExpense(id, expenseData);
            
            res.json({
                success: true,
                message: 'Despesa fixa atualizada com sucesso',
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'UPDATE_ERROR'
            });
        }
    }

    async deleteFixedExpense(req, res) {
        try {
            const { id } = req.params;
            await expenseService.deleteFixedExpense(id);
            
            res.json({
                success: true,
                message: 'Despesa fixa deletada com sucesso'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'EXPENSE_NOT_FOUND'
            });
        }
    }

    // Variable Expenses
    async createVariableExpense(req, res) {
        try {
            const expenseData = validateExpenseData(req.body);
            const expense = await expenseService.createVariableExpense(expenseData);
            
            res.status(201).json({
                success: true,
                message: 'Despesa variável criada com sucesso',
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'VALIDATION_ERROR'
            });
        }
    }

    async getVariableExpenses(req, res) {
        try {
            const expenses = await expenseService.getVariableExpenses();
            
            res.json({
                success: true,
                data: expenses.map(expense => expense.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async getVariableExpenseById(req, res) {
        try {
            const { id } = req.params;
            const expense = await expenseService.getVariableExpenseById(id);
            
            res.json({
                success: true,
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'EXPENSE_NOT_FOUND'
            });
        }
    }

    async updateVariableExpense(req, res) {
        try {
            const { id } = req.params;
            const expenseData = validateExpenseData(req.body);
            const expense = await expenseService.updateVariableExpense(id, expenseData);
            
            res.json({
                success: true,
                message: 'Despesa variável atualizada com sucesso',
                data: expense.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'UPDATE_ERROR'
            });
        }
    }

    async deleteVariableExpense(req, res) {
        try {
            const { id } = req.params;
            await expenseService.deleteVariableExpense(id);
            
            res.json({
                success: true,
                message: 'Despesa variável deletada com sucesso'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'EXPENSE_NOT_FOUND'
            });
        }
    }

    // Payment processing
    async processPayment(req, res) {
        try {
            const paymentData = validatePaymentData(req.body);
            const result = await expenseService.processPayment(req.user.id, paymentData);
            
            res.status(201).json({
                success: true,
                message: 'Pagamento processado com sucesso',
                data: result
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'PAYMENT_ERROR'
            });
        }
    }

    // Financial summary
    async getFinancialSummary(req, res) {
        try {
            const summary = await expenseService.getFinancialSummary();
            
            res.json({
                success: true,
                data: summary
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    // Get expenses by type
    async getExpensesByType(req, res) {
        try {
            const { type } = req.params;
            const expenses = await expenseService.getExpensesByType(type);
            
            res.json({
                success: true,
                data: expenses.map(expense => expense.toJSON())
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'VALIDATION_ERROR'
            });
        }
    }
}

module.exports = new ExpenseController();
