// Banco de dados em memória
class InMemoryDatabase {
    constructor() {
        this.users = [];
        this.fixedExpenses = [];
        this.variableExpenses = [];
        this.revenues = [];
        this.payments = [];
    }

    // Métodos para User
    createUser(user) {
        this.users.push(user);
        return user;
    }

    findUserById(id) {
        return this.users.find(user => user.id === id);
    }

    findUserByEmail(email) {
        return this.users.find(user => user.email === email);
    }

    getAllUsers() {
        return this.users;
    }

    updateUser(id, userData) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            this.users[index] = { ...this.users[index], ...userData, updatedAt: new Date() };
            return this.users[index];
        }
        return null;
    }

    deleteUser(id) {
        const index = this.users.findIndex(user => user.id === id);
        if (index !== -1) {
            return this.users.splice(index, 1)[0];
        }
        return null;
    }

    // Métodos para FixedExpense
    createFixedExpense(expense) {
        this.fixedExpenses.push(expense);
        return expense;
    }

    findFixedExpenseById(id) {
        return this.fixedExpenses.find(expense => expense.id === id);
    }

    getAllFixedExpenses() {
        return this.fixedExpenses;
    }

    updateFixedExpense(id, expenseData) {
        const index = this.fixedExpenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            this.fixedExpenses[index] = { ...this.fixedExpenses[index], ...expenseData, updatedAt: new Date() };
            return this.fixedExpenses[index];
        }
        return null;
    }

    deleteFixedExpense(id) {
        const index = this.fixedExpenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            return this.fixedExpenses.splice(index, 1)[0];
        }
        return null;
    }

    // Métodos para VariableExpense
    createVariableExpense(expense) {
        this.variableExpenses.push(expense);
        return expense;
    }

    findVariableExpenseById(id) {
        return this.variableExpenses.find(expense => expense.id === id);
    }

    getAllVariableExpenses() {
        return this.variableExpenses;
    }

    updateVariableExpense(id, expenseData) {
        const index = this.variableExpenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            this.variableExpenses[index] = { ...this.variableExpenses[index], ...expenseData, updatedAt: new Date() };
            return this.variableExpenses[index];
        }
        return null;
    }

    deleteVariableExpense(id) {
        const index = this.variableExpenses.findIndex(expense => expense.id === id);
        if (index !== -1) {
            return this.variableExpenses.splice(index, 1)[0];
        }
        return null;
    }

    // Métodos para Revenue
    createRevenue(revenue) {
        this.revenues.push(revenue);
        return revenue;
    }

    findRevenueById(id) {
        return this.revenues.find(revenue => revenue.id === id);
    }

    findRevenueByUserId(userId) {
        return this.revenues.find(revenue => revenue.userId === userId);
    }

    getAllRevenues() {
        return this.revenues;
    }

    updateRevenue(id, revenueData) {
        const index = this.revenues.findIndex(revenue => revenue.id === id);
        if (index !== -1) {
            this.revenues[index] = { ...this.revenues[index], ...revenueData, updatedAt: new Date() };
            return this.revenues[index];
        }
        return null;
    }

    deleteRevenue(id) {
        const index = this.revenues.findIndex(revenue => revenue.id === id);
        if (index !== -1) {
            return this.revenues.splice(index, 1)[0];
        }
        return null;
    }

    // Métodos para Payment
    createPayment(payment) {
        this.payments.push(payment);
        return payment;
    }

    findPaymentById(id) {
        return this.payments.find(payment => payment.id === id);
    }

    findPaymentsByUserId(userId) {
        return this.payments.filter(payment => payment.userId === userId);
    }

    findPaymentsByExpenseId(expenseId) {
        return this.payments.filter(payment => payment.expenseId === expenseId);
    }

    getAllPayments() {
        return this.payments;
    }

    updatePayment(id, paymentData) {
        const index = this.payments.findIndex(payment => payment.id === id);
        if (index !== -1) {
            this.payments[index] = { ...this.payments[index], ...paymentData, updatedAt: new Date() };
            return this.payments[index];
        }
        return null;
    }

    deletePayment(id) {
        const index = this.payments.findIndex(payment => payment.id === id);
        if (index !== -1) {
            return this.payments.splice(index, 1)[0];
        }
        return null;
    }

    // Métodos de cálculo
    getTotalFixedExpenses() {
        return this.fixedExpenses.reduce((total, expense) => total + expense.value, 0);
    }

    getTotalVariableExpenses() {
        return this.variableExpenses.reduce((total, expense) => total + expense.value, 0);
    }

    getTotalExpenses() {
        return this.getTotalFixedExpenses() + this.getTotalVariableExpenses();
    }

    getTotalPaidFixedExpenses() {
        return this.fixedExpenses.reduce((total, expense) => total + expense.paidValue, 0);
    }

    getTotalPaidVariableExpenses() {
        return this.variableExpenses.reduce((total, expense) => total + expense.paidValue, 0);
    }

    getTotalPaid() {
        return this.getTotalPaidFixedExpenses() + this.getTotalPaidVariableExpenses();
    }

    getTotalToPay() {
        return this.getTotalExpenses() - this.getTotalPaid();
    }

    getTotalRevenue() {
        return this.revenues.reduce((total, revenue) => total + revenue.currentValue, 0);
    }

    getFinalSituation() {
        return this.getTotalRevenue() - this.getTotalExpenses();
    }
}

module.exports = new InMemoryDatabase();
