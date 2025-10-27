const paymentService = require('../services/PaymentService');

class PaymentController {
    async getPayments(req, res) {
        try {
            const { userId, expenseId, expenseType, startDate, endDate } = req.query;
            const filters = {};
            
            if (userId) filters.userId = userId;
            if (expenseId) filters.expenseId = expenseId;
            if (expenseType) filters.expenseType = expenseType;
            if (startDate) filters.startDate = startDate;
            if (endDate) filters.endDate = endDate;

            const payments = await paymentService.getPaymentHistory(filters);
            
            res.json({
                success: true,
                data: payments.map(payment => payment.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async getPaymentById(req, res) {
        try {
            const { id } = req.params;
            const payment = await paymentService.getPaymentById(id);
            
            res.json({
                success: true,
                data: payment.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'PAYMENT_NOT_FOUND'
            });
        }
    }

    async getUserPayments(req, res) {
        try {
            const payments = await paymentService.getPaymentsByUserId(req.user.id);
            
            res.json({
                success: true,
                data: payments.map(payment => payment.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async getExpensePayments(req, res) {
        try {
            const { expenseId } = req.params;
            const payments = await paymentService.getPaymentsByExpenseId(expenseId);
            
            res.json({
                success: true,
                data: payments.map(payment => payment.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async getPaymentSummary(req, res) {
        try {
            const { userId } = req.query;
            const summary = await paymentService.getPaymentSummary(userId);
            
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

    async deletePayment(req, res) {
        try {
            const { id } = req.params;
            await paymentService.deletePayment(id);
            
            res.json({
                success: true,
                message: 'Pagamento deletado com sucesso'
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'PAYMENT_NOT_FOUND'
            });
        }
    }
}

module.exports = new PaymentController();
