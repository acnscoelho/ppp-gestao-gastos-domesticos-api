const request = require('supertest');


const obterToken = async (email, password) => {
    const respostaLogin = await request(process.env.BASE_URL)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send({
            'email': email,
            'password': password
        })
    
    return respostaLogin
}

module.exports = {
    obterToken
}