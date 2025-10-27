const revenueService = require('../services/RevenueService');
const { validateRevenueData } = require('../middleware/validation');

class RevenueController {
    async createRevenue(req, res) {
        try {
            const revenueData = validateRevenueData(req.body);
            const revenue = await revenueService.createRevenue(req.user.id, revenueData);
            
            res.status(201).json({
                success: true,
                message: 'Receita criada com sucesso',
                data: revenue.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'VALIDATION_ERROR'
            });
        }
    }

    async getRevenue(req, res) {
        try {
            const revenue = await revenueService.getRevenueByUserId(req.user.id);
            
            res.json({
                success: true,
                data: revenue.toJSON()
            });
        } catch (error) {
            res.status(404).json({
                success: false,
                message: error.message,
                error: 'REVENUE_NOT_FOUND'
            });
        }
    }

    async getAllRevenues(req, res) {
        try {
            const revenues = await revenueService.getAllRevenues();
            
            res.json({
                success: true,
                data: revenues.map(revenue => revenue.toJSON())
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erro interno do servidor',
                error: 'INTERNAL_ERROR'
            });
        }
    }

    async updateRevenue(req, res) {
        try {
            const revenueData = validateRevenueData(req.body);
            const revenue = await revenueService.updateRevenue(req.user.id, revenueData);
            
            res.json({
                success: true,
                message: 'Receita atualizada com sucesso',
                data: revenue.toJSON()
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'UPDATE_ERROR'
            });
        }
    }

    async deleteRevenue(req, res) {
        try {
            await revenueService.deleteRevenue(req.user.id);
            
            res.json({
                success: true,
                message: 'Receita deletada com sucesso'
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message,
                error: 'DELETE_ERROR'
            });
        }
    }

    async getRevenueSummary(req, res) {
        try {
            const summary = await revenueService.getRevenueSummary();
            
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

    async getUserRevenueSummary(req, res) {
        try {
            const summary = await revenueService.getUserRevenueSummary(req.user.id);
            
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
}

module.exports = new RevenueController();
