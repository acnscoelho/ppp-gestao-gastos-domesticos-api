const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')


describe('Expenses /expenses/fixed', () => {

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

describe('POST /expenses/fixed', async () => {
    it('Deve retornar 201 quando o usuário realizar o cadastro de despesas fixas', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/fixed')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Carro',
                'value': 1000,   
            })   

        expect(resposta.status).to.equal(201);
        expect(resposta.body.message).to.equal('Despesa fixa criada com sucesso');        
    })

    it('Deve retornar 400 quando tentar registrar despesa fixa com campos obrigatórios ausentes', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/fixed')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': '',
                'value': ''
            })
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Campos obrigatórios: name, value');
    })

    it('Deve retornar 400 quando tentar registrar despesa fixa com valor negativo', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/fixed')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Condomínio',
                'value': -1500
            })
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Valor deve ser um número válido maior ou igual a zero');
    })
})

describe('GET /expenses/fixed', async () => {
    it('Deve retornar 200 quando for exibida a lista de despesas fixas', async () => {
        const resposta = await request(process.env.BASE_URL)
            .get('/expenses/fixed')
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

