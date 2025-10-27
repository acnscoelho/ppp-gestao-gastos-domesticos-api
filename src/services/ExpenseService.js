const FixedExpense = require('../models/FixedExpense');
const VariableExpense = require('../models/VariableExpense');
const Payment = require('../models/Payment');
const Revenue = require('../models/Revenue');
const database = require('../config/database');

class ExpenseService {
    // Fixed Expenses
    async createFixedExpense(expenseData) {
        const expense = new FixedExpense(expenseData.name, expenseData.value, expenseData.status);
        return database.createFixedExpense(expense);
    }

    async getFixedExpenses() {
        return database.getAllFixedExpenses();
    }

    async getFixedExpenseById(id) {
        const expense = database.findFixedExpenseById(id);
        if (!expense) {
            throw new Error('Despesa fixa não encontrada');
        }
        return expense;
    }

    async updateFixedExpense(id, expenseData) {
        const expense = database.findFixedExpenseById(id);
        if (!expense) {
            throw new Error('Despesa fixa não encontrada');
        }

        return database.updateFixedExpense(id, expenseData);
    }

    async deleteFixedExpense(id) {
        const expense = database.findFixedExpenseById(id);
        if (!expense) {
            throw new Error('Despesa fixa não encontrada');
        }

        // Remover pagamentos relacionados
        const relatedPayments = database.findPaymentsByExpenseId(id);
        relatedPayments.forEach(payment => {
            database.deletePayment(payment.id);
        });

        return database.deleteFixedExpense(id);
    }

    // Variable Expenses
    async createVariableExpense(expenseData) {
        const expense = new VariableExpense(expenseData.name, expenseData.value, expenseData.status);
        return database.createVariableExpense(expense);
    }

    async getVariableExpenses() {
        return database.getAllVariableExpenses();
    }

    async getVariableExpenseById(id) {
        const expense = database.findVariableExpenseById(id);
        if (!expense) {
            throw new Error('Despesa variável não encontrada');
        }
        return expense;
    }

    async updateVariableExpense(id, expenseData) {
        const expense = database.findVariableExpenseById(id);
        if (!expense) {
            throw new Error('Despesa variável não encontrada');
        }

        return database.updateVariableExpense(id, expenseData);
    }

    async deleteVariableExpense(id) {
        const expense = database.findVariableExpenseById(id);
        if (!expense) {
            throw new Error('Despesa variável não encontrada');
        }

        // Remover pagamentos relacionados
        const relatedPayments = database.findPaymentsByExpenseId(id);
        relatedPayments.forEach(payment => {
            database.deletePayment(payment.id);
        });

        return database.deleteVariableExpense(id);
    }

    // Payment processing
    async processPayment(userId, paymentData) {
        const { expenseId, expenseType, amount, description } = paymentData;
        
        let expense;
        if (expenseType === 'fixed') {
            expense = database.findFixedExpenseById(expenseId);
        } else {
            expense = database.findVariableExpenseById(expenseId);
        }

        if (!expense) {
            throw new Error('Despesa não encontrada');
        }

        // Verificar se há receita disponível para o usuário
        const userRevenue = database.findRevenueByUserId(userId);
        if (!userRevenue) {
            throw new Error('Usuário não possui receita registrada');
        }

        if (userRevenue.getAvailableValue() < amount) {
            throw new Error('Receita insuficiente para realizar o pagamento');
        }

        // Processar pagamento na despesa
        expense.addPayment(amount);

        // Deduzir valor da receita
        userRevenue.useValue(amount);

        // Criar registro de pagamento
        const payment = new Payment(userId, expenseId, expenseType, amount, description);
        database.createPayment(payment);

        return {
            payment: payment.toJSON(),
            expense: expense.toJSON(),
            remainingRevenue: userRevenue.getAvailableValue()
        };
    }

    // Financial summary
    async getFinancialSummary() {
        const totalFixedExpenses = database.getTotalFixedExpenses();
        const totalVariableExpenses = database.getTotalVariableExpenses();
        const totalExpenses = database.getTotalExpenses();
        const totalPaidFixed = database.getTotalPaidFixedExpenses();
        const totalPaidVariable = database.getTotalPaidVariableExpenses();
        const totalPaid = database.getTotalPaid();
        const totalToPay = database.getTotalToPay();
        const totalRevenue = database.getTotalRevenue();
        const finalSituation = database.getFinalSituation();

        return {
            fixedExpenses: {
                total: totalFixedExpenses,
                paid: totalPaidFixed,
                remaining: totalFixedExpenses - totalPaidFixed
            },
            variableExpenses: {
                total: totalVariableExpenses,
                paid: totalPaidVariable,
                remaining: totalVariableExpenses - totalPaidVariable
            },
            totalExpenses: totalExpenses,
            totalPaid: totalPaid,
            totalToPay: totalToPay,
            totalRevenue: totalRevenue,
            finalSituation: finalSituation
        };
    }

    async getExpensesByType(type) {
        if (type === 'fixed') {
            return database.getAllFixedExpenses();
        } else if (type === 'variable') {
            return database.getAllVariableExpenses();
        } else {
            throw new Error('Tipo de despesa deve ser "fixed" ou "variable"');
        }
    }
}

module.exports = new ExpenseService();
