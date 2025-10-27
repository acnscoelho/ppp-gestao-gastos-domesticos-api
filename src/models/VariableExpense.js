const { v4: uuidv4 } = require('uuid');

class VariableExpense {
    constructor(name, value, status = 'Pendente') {
        this.id = uuidv4();
        this.name = name;
        this.value = parseFloat(value);
        this.status = status; // 'Pendente', 'Pago', 'OK'
        this.paidValue = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromObject(obj) {
        const expense = new VariableExpense(obj.name, obj.value, obj.status);
        expense.id = obj.id;
        expense.paidValue = obj.paidValue || 0;
        expense.createdAt = obj.createdAt;
        expense.updatedAt = obj.updatedAt;
        return expense;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            value: this.value,
            status: this.status,
            paidValue: this.paidValue,
            remainingValue: this.value - this.paidValue,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    addPayment(amount) {
        const paymentAmount = parseFloat(amount);
        if (paymentAmount <= 0) {
            throw new Error('Valor do pagamento deve ser maior que zero');
        }
        
        if (this.paidValue + paymentAmount > this.value) {
            throw new Error('Valor do pagamento excede o valor total da despesa');
        }

        this.paidValue += paymentAmount;
        this.updatedAt = new Date();
        
        if (this.paidValue >= this.value) {
            this.status = 'Pago';
        } else {
            this.status = 'OK';
        }
    }

    getRemainingValue() {
        return this.value - this.paidValue;
    }
}

module.exports = VariableExpense;
