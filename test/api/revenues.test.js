const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../../helpers/autenticacao')


describe('Revenues /revenues', () => {

    let usuarioCriado = {
        name: '',
        email: '',
        password: '123456',
        token: ''
    };

    before(async () => {
        const timestamp = Date.now();
        usuarioCriado.name = `UserRevenues${timestamp}`;
        usuarioCriado.email = `revenues${timestamp}@gmail.com`;

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

describe('POST /revenues', async () => {
    it('Deve retornar 201 quando o usuário realizar o cadastro da receita', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/revenues')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'currentValue': 2000
            })   

        expect(resposta.status).to.equal(201);
        expect(resposta.body.message).to.equal('Receita criada com sucesso');        
    })

    it('Deve retornar 400 quando o usuário já tem uma receita cadastrada', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/revenues')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'currentValue': 2500
            })
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Usuário já possui receita registrada. Use a atualização para modificar.');
    })

    it('Deve retornar 400 quando o usuário tentar criar uma receita com valor negativo', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/revenues')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'currentValue': -100
            })
        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Valor atual deve ser um número válido maior ou igual a zero');
    })
})

describe('GET /revenues', async () => {
    it('Deve retornar 200 e exibir a receita com todos os campos quando o usuário autenticado visualizar sua receita', async () => {
        const resposta = await request(process.env.BASE_URL)
            .get('/revenues')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')


        expect(resposta.status).to.equal(200);
        expect(resposta.body.data).to.exists;

        expect(resposta.body.data).to.include.all.keys(
            'currentValue', 
            'previousValue', 
            'usedValue', 
            'availableValue'
        );
        expect(resposta.body.data.currentValue).to.equal(2000);
        expect(resposta.body.data.previousValue).to.equal(0);
        expect(resposta.body.data.usedValue).to.be.a('number');
        expect(resposta.body.data.availableValue).to.be.a('number');
    })
})    

    after(async () => {
        await request(process.env.BASE_URL)
            .delete('/users/profile')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
    })
}) 

