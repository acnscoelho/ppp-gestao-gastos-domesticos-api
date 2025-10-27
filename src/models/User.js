const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

class User {
    constructor(name, email, password) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.password = bcrypt.hashSync(password, 10);
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    static fromObject(obj) {
        const user = new User(obj.name, obj.email, obj.password);
        user.id = obj.id;
        user.password = obj.password; // Já vem hasheado do banco
        user.createdAt = obj.createdAt;
        user.updatedAt = obj.updatedAt;
        return user;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }

    validatePassword(password) {
        return bcrypt.compareSync(password, this.password);
    }
}

module.exports = User;
