const { v4: uuidv4 } = require('uuid');

class Payment {
    constructor(userId, expenseId, expenseType, amount, description = '') {
        this.id = uuidv4();
        this.userId = userId;
        this.expenseId = expenseId;
        this.expenseType = expenseType; // 'fixed' ou 'variable'
        this.amount = parseFloat(amount);
        this.description = description;
        this.paymentDate = new Date();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromObject(obj) {
        const payment = new Payment(obj.userId, obj.expenseId, obj.expenseType, obj.amount, obj.description);
        payment.id = obj.id;
        payment.paymentDate = new Date(obj.paymentDate);
        payment.createdAt = obj.createdAt;
        payment.updatedAt = obj.updatedAt;
        return payment;
    }

    toJSON() {
        return {
            id: this.id,
            userId: this.userId,
            expenseId: this.expenseId,
            expenseType: this.expenseType,
            amount: this.amount,
            description: this.description,
            paymentDate: this.paymentDate,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Payment;
