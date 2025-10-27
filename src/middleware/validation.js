const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validateRequired = (fields, data) => {
    const missing = [];
    fields.forEach(field => {
        if (!data[field] || (typeof data[field] === 'string' && data[field].trim() === '')) {
            missing.push(field);
        }
    });
    return missing;
};

const validateNumber = (value, fieldName) => {
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
        throw new Error(`${fieldName} deve ser um número válido maior ou igual a zero`);
    }
    return num;
};

const validateExpenseData = (data) => {
    const required = ['name', 'value'];
    const missing = validateRequired(required, data);
    
    if (missing.length > 0) {
        throw new Error(`Campos obrigatórios: ${missing.join(', ')}`);
    }

    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
    }

    const value = validateNumber(data.value, 'Valor');
    
    return {
        name: data.name.trim(),
        value: value,
        status: data.status || 'Pendente'
    };
};

const validateRevenueData = (data) => {
    const required = ['currentValue'];
    const missing = validateRequired(required, data);
    
    if (missing.length > 0) {
        throw new Error(`Campos obrigatórios: ${missing.join(', ')}`);
    }

    const currentValue = validateNumber(data.currentValue, 'Valor atual');
    const previousValue = data.previousValue ? validateNumber(data.previousValue, 'Valor anterior') : 0;
    
    return {
        currentValue: currentValue,
        previousValue: previousValue
    };
};

const validatePaymentData = (data) => {
    const required = ['expenseId', 'expenseType', 'amount'];
    const missing = validateRequired(required, data);
    
    if (missing.length > 0) {
        throw new Error(`Campos obrigatórios: ${missing.join(', ')}`);
    }

    if (!['fixed', 'variable'].includes(data.expenseType)) {
        throw new Error('Tipo de despesa deve ser "fixed" ou "variable"');
    }

    const amount = validateNumber(data.amount, 'Valor do pagamento');
    
    return {
        expenseId: data.expenseId,
        expenseType: data.expenseType,
        amount: amount,
        description: data.description || ''
    };
};

const validateUserData = (data) => {
    const required = ['name', 'email', 'password'];
    const missing = validateRequired(required, data);
    
    if (missing.length > 0) {
        throw new Error(`Campos obrigatórios: ${missing.join(', ')}`);
    }

    if (typeof data.name !== 'string' || data.name.trim().length < 2) {
        throw new Error('Nome deve ter pelo menos 2 caracteres');
    }

    if (!validateEmail(data.email)) {
        throw new Error('Email deve ter um formato válido');
    }

    if (typeof data.password !== 'string' || data.password.length < 6) {
        throw new Error('Senha deve ter pelo menos 6 caracteres');
    }

    return {
        name: data.name.trim(),
        email: data.email.toLowerCase().trim(),
        password: data.password
    };
};

const validateLoginData = (data) => {
    const required = ['email', 'password'];
    const missing = validateRequired(required, data);
    
    if (missing.length > 0) {
        throw new Error(`Campos obrigatórios: ${missing.join(', ')}`);
    }

    if (!validateEmail(data.email)) {
        throw new Error('Email deve ter um formato válido');
    }

    return {
        email: data.email.toLowerCase().trim(),
        password: data.password
    };
};

module.exports = {
    validateEmail,
    validateRequired,
    validateNumber,
    validateExpenseData,
    validateRevenueData,
    validatePaymentData,
    validateUserData,
    validateLoginData
};
