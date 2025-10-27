const Payment = require('../models/Payment');
const database = require('../config/database');

class PaymentService {
    async getPaymentsByUserId(userId) {
        return database.findPaymentsByUserId(userId);
    }

    async getPaymentsByExpenseId(expenseId) {
        return database.findPaymentsByExpenseId(expenseId);
    }

    async getAllPayments() {
        return database.getAllPayments();
    }

    async getPaymentById(id) {
        const payment = database.findPaymentById(id);
        if (!payment) {
            throw new Error('Pagamento não encontrado');
        }
        return payment;
    }

    async getPaymentHistory(filters = {}) {
        let payments = database.getAllPayments();

        // Aplicar filtros
        if (filters.userId) {
            payments = payments.filter(payment => payment.userId === filters.userId);
        }

        if (filters.expenseId) {
            payments = payments.filter(payment => payment.expenseId === filters.expenseId);
        }

        if (filters.expenseType) {
            payments = payments.filter(payment => payment.expenseType === filters.expenseType);
        }

        if (filters.startDate) {
            const startDate = new Date(filters.startDate);
            payments = payments.filter(payment => new Date(payment.paymentDate) >= startDate);
        }

        if (filters.endDate) {
            const endDate = new Date(filters.endDate);
            payments = payments.filter(payment => new Date(payment.paymentDate) <= endDate);
        }

        // Ordenar por data de pagamento (mais recente primeiro)
        payments.sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));

        return payments;
    }

    async getPaymentSummary(userId = null) {
        let payments = database.getAllPayments();
        
        if (userId) {
            payments = payments.filter(payment => payment.userId === userId);
        }

        const totalAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
        
        const byExpenseType = payments.reduce((acc, payment) => {
            if (!acc[payment.expenseType]) {
                acc[payment.expenseType] = 0;
            }
            acc[payment.expenseType] += payment.amount;
            return acc;
        }, {});

        const byMonth = payments.reduce((acc, payment) => {
            const month = new Date(payment.paymentDate).toISOString().substring(0, 7); // YYYY-MM
            if (!acc[month]) {
                acc[month] = 0;
            }
            acc[month] += payment.amount;
            return acc;
        }, {});

        return {
            totalPayments: payments.length,
            totalAmount,
            byExpenseType,
            byMonth,
            averagePayment: payments.length > 0 ? totalAmount / payments.length : 0
        };
    }

    async deletePayment(id) {
        const payment = database.findPaymentById(id);
        if (!payment) {
            throw new Error('Pagamento não encontrado');
        }

        // Reverter o pagamento na despesa
        let expense;
        if (payment.expenseType === 'fixed') {
            expense = database.findFixedExpenseById(payment.expenseId);
        } else {
            expense = database.findVariableExpenseById(payment.expenseId);
        }

        if (expense) {
            // Reverter o valor pago
            expense.paidValue = Math.max(0, expense.paidValue - payment.amount);
            expense.updatedAt = new Date();
            
            // Atualizar status
            if (expense.paidValue >= expense.value) {
                expense.status = 'Pago';
            } else if (expense.paidValue > 0) {
                expense.status = 'OK';
            } else {
                expense.status = 'Pendente';
            }
        }

        // Reverter o valor na receita
        const userRevenue = database.findRevenueByUserId(payment.userId);
        if (userRevenue) {
            userRevenue.usedValue = Math.max(0, userRevenue.usedValue - payment.amount);
            userRevenue.updatedAt = new Date();
        }

        return database.deletePayment(id);
    }
}

module.exports = new PaymentService();
