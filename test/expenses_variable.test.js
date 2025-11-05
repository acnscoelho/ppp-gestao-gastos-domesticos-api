const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')


describe('Expenses /expenses/variable', () => {

    let usuarioCriado = {
        name: '',
        email: '',
        password: '123456',
        token: ''
    };

    before(async () => {
        const timestamp = Date.now();
        usuarioCriado.name = `UserExpenses${timestamp}`;
        usuarioCriado.email = `expenses${timestamp}@gmail.com`;

        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                'name': usuarioCriado.name,
                'email': usuarioCriado.email,
                'password': usuarioCriado.password
            });

        usuarioCriado.token = resposta.body.data.token;
    })

describe('POST /expenses/variable', async () => {
    it('Deve retornar 201 quando o usuário realizar o cadastro de despesas variáveis', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/variable')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Plano de Saúde',
                'value': 500,   
            })   

        expect(resposta.status).to.equal(201);
        expect(resposta.body.message).to.equal('Despesa variável criada com sucesso');        
    })

    it('Deve retornar 400 quando tentar registrar despesa variável com campos obrigatórios ausentes', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/variable')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': '',
                'value': ''
            })
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Campos obrigatórios: name, value');
    })
})

describe('GET /expenses/variable', async () => {
    it('Deve retornar 200 quando for exibida a lista de despesas variáveis', async () => {
        const resposta = await request(process.env.BASE_URL)
            .get('/expenses/variable')
            .set('Content-Type', 'application/json')
        expect(resposta.status).to.equal(200);
        })
})    

    after(async () => {
        await request(process.env.BASE_URL)
            .delete('/users/profile')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
    }) 
})
