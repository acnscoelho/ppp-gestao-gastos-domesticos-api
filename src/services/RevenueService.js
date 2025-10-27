const Revenue = require('../models/Revenue');
const database = require('../config/database');

class RevenueService {
    async createRevenue(userId, revenueData) {
        // Verificar se usuário já possui receita
        const existingRevenue = database.findRevenueByUserId(userId);
        if (existingRevenue) {
            throw new Error('Usuário já possui receita registrada. Use a atualização para modificar.');
        }

        const revenue = new Revenue(userId, revenueData.currentValue, revenueData.previousValue);
        return database.createRevenue(revenue);
    }

    async getRevenueByUserId(userId) {
        const revenue = database.findRevenueByUserId(userId);
        if (!revenue) {
            throw new Error('Receita não encontrada para este usuário');
        }
        return revenue;
    }

    async getAllRevenues() {
        return database.getAllRevenues();
    }

    async updateRevenue(userId, revenueData) {
        const revenue = database.findRevenueByUserId(userId);
        if (!revenue) {
            throw new Error('Receita não encontrada para este usuário');
        }

        // Se está atualizando o valor atual, verificar se não está tentando reduzir abaixo do valor já utilizado
        if (revenueData.currentValue !== undefined) {
            const newCurrentValue = parseFloat(revenueData.currentValue);
            if (newCurrentValue < revenue.usedValue) {
                throw new Error('Valor atual não pode ser menor que o valor já utilizado');
            }
        }

        return database.updateRevenue(revenue.id, revenueData);
    }

    async deleteRevenue(userId) {
        const revenue = database.findRevenueByUserId(userId);
        if (!revenue) {
            throw new Error('Receita não encontrada para este usuário');
        }

        // Verificar se há valor utilizado
        if (revenue.usedValue > 0) {
            throw new Error('Não é possível deletar receita que já possui valores utilizados');
        }

        return database.deleteRevenue(revenue.id);
    }

    async getRevenueSummary() {
        const revenues = database.getAllRevenues();
        const totalCurrent = revenues.reduce((sum, revenue) => sum + revenue.currentValue, 0);
        const totalPrevious = revenues.reduce((sum, revenue) => sum + revenue.previousValue, 0);
        const totalUsed = revenues.reduce((sum, revenue) => sum + revenue.usedValue, 0);
        const totalAvailable = totalCurrent - totalUsed;

        return {
            totalCurrent,
            totalPrevious,
            totalUsed,
            totalAvailable,
            revenues: revenues.map(revenue => revenue.toJSON())
        };
    }

    async getUserRevenueSummary(userId) {
        const revenue = database.findRevenueByUserId(userId);
        if (!revenue) {
            return {
                hasRevenue: false,
                message: 'Usuário não possui receita registrada'
            };
        }

        return {
            hasRevenue: true,
            revenue: revenue.toJSON(),
            availableValue: revenue.getAvailableValue()
        };
    }
}

module.exports = new RevenueService();
