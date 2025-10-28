const expenseService = require('../services/ExpenseService');
const revenueService = require('../services/RevenueService');
const paymentService = require('../services/PaymentService');

class DashboardController {
    async getDashboard(req, res) {
        try {
            // Obter dados financeiros
            const financialSummary = await expenseService.getFinancialSummary();
            const revenueSummary = await revenueService.getRevenueSummary();
            const paymentSummary = await paymentService.getPaymentSummary();
            
            // Obter despesas detalhadas
            const fixedExpenses = await expenseService.getFixedExpenses();
            const variableExpenses = await expenseService.getVariableExpenses();
            
            // Preparar dados para os gráficos
            const chartData = {
                expenses: {
                    fixed: financialSummary.fixedExpenses.total,
                    variable: financialSummary.variableExpenses.total,
                    total: financialSummary.totalExpenses
                },
                payments: {
                    paid: financialSummary.totalPaid,
                    remaining: financialSummary.totalToPay,
                    total: financialSummary.totalExpenses
                },
                revenue: {
                    total: financialSummary.totalRevenue,
                    used: financialSummary.totalRevenue - (revenueSummary.totalAvailable || 0),
                    available: revenueSummary.totalAvailable || 0
                }
            };

            // Dados para a tabela de despesas
            const expensesTable = [
                ...fixedExpenses.map(expense => ({
                    ...expense.toJSON(),
                    type: 'Fixa',
                    category: 'Despesas Fixas'
                })),
                ...variableExpenses.map(expense => ({
                    ...expense.toJSON(),
                    type: 'Variável',
                    category: 'Despesas Variáveis'
                }))
            ];

            // Ordenar por valor (maior para menor)
            expensesTable.sort((a, b) => b.value - a.value);

            res.render('dashboard', {
                title: 'Dashboard Financeiro',
                financialSummary,
                revenueSummary,
                paymentSummary,
                chartData,
                expensesTable,
                currentDate: new Date().toLocaleDateString('pt-BR'),
                currentTime: new Date().toLocaleTimeString('pt-BR')
            });
        } catch (error) {
            console.error('Erro ao carregar dashboard:', error);
            res.status(500).render('error', {
                title: 'Erro no Dashboard',
                message: 'Erro interno do servidor ao carregar o dashboard',
                error: process.env.NODE_ENV === 'development' ? error : {}
            });
        }
    }

    async getDashboardData(req, res) {
        try {
            const financialSummary = await expenseService.getFinancialSummary();
            const revenueSummary = await revenueService.getRevenueSummary();
            const paymentSummary = await paymentService.getPaymentSummary();
            
            res.json({
                success: true,
                data: {
                    financial: financialSummary,
                    revenue: revenueSummary,
                    payments: paymentSummary
                }
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro ao obter dados do dashboard',
                error: 'DASHBOARD_ERROR'
            });
        }
    }
}

module.exports = new DashboardController();
