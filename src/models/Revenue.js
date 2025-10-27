const { v4: uuidv4 } = require('uuid');

class Revenue {
    constructor(userId, currentValue, previousValue = 0) {
        this.id = uuidv4();
        this.userId = userId;
        this.currentValue = parseFloat(currentValue);
        this.previousValue = parseFloat(previousValue);
        this.usedValue = 0; // Valor já utilizado em pagamentos
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromObject(obj) {
        const revenue = new Revenue(obj.userId, obj.currentValue, obj.previousValue);
        revenue.id = obj.id;
        revenue.usedValue = obj.usedValue || 0;
        revenue.createdAt = obj.createdAt;
        revenue.updatedAt = obj.updatedAt;
        return revenue;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            currentValue: this.currentValue,
            previousValue: this.previousValue,
            usedValue: this.usedValue,
            availableValue: this.currentValue - this.usedValue,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    useValue(amount) {
        const useAmount = parseFloat(amount);
        if (useAmount <= 0) {
            throw new Error('Valor a ser utilizado deve ser maior que zero');
        }
        
        if (this.usedValue + useAmount > this.currentValue) {
            throw new Error('Valor a ser utilizado excede a receita disponível');
        }

        this.usedValue += useAmount;
        this.updatedAt = new Date();
    }

    getAvailableValue() {
        return this.currentValue - this.usedValue;
    }

    updateCurrentValue(newValue) {
        this.currentValue = parseFloat(newValue);
        this.updatedAt = new Date();
    }
}

module.exports = Revenue;
