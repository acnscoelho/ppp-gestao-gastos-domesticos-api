const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../../helpers/autenticacao')


describe('Expenses /expenses/payment', () => {
    let usuarioCriado = {
        name: '',
        email: '',
        password: '123456',
        token: ''
    };

    let despesaCriada = {  
        id: ''
    };

    before(async () => {
        const timestamp = Date.now();
        usuarioCriado.name = `UserPayment${timestamp}`;
        usuarioCriado.email = `payment${timestamp}@gmail.com`;
    
        const resposta = await request(process.env.BASE_URL)
            .post('/users/register')
            .set('Content-Type', 'application/json')
            .send({
                'name': usuarioCriado.name,
                'email': usuarioCriado.email,
                'password': usuarioCriado.password
            });

        usuarioCriado.token = resposta.body.data.token;

        await request(process.env.BASE_URL)
            .post('/revenues')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'currentValue': 5000,
                'previousValue': 0  
            })

        const respostaDespesa = await request(process.env.BASE_URL)
            .post('/expenses/fixed')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Carro',
                'value': 1000   
            }) 

        despesaCriada.id = respostaDespesa.body.data.id;    
    })

describe('POST /expenses/payment', async () => {
    it('Deve retornar 201 quando o usuário tem receita disponível e realiza um pagamento', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/payment')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                    "expenseId": despesaCriada.id,
                    "expenseType": "fixed",
                    "amount": 1000
            })   

        expect(resposta.status).to.equal(201);
        expect(resposta.body.message).to.equal('Pagamento processado com sucesso');        
    })

    it('Deve retornar 400 quando o usuário tenta realizar um pagamento com receita insuficiente', async () => {
        const resposta = await request(process.env.BASE_URL)
            .post('/expenses/payment')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                    "expenseId": despesaCriada.id,
                    "expenseType": "fixed",
                    "amount": 6000
            })  

        expect(resposta.status).to.equal(400);
        expect(resposta.body.message).to.equal('Receita insuficiente para realizar o pagamento');
    })
})    

    after(async () => {
        await request(process.env.BASE_URL)
            .delete('/users/profile')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)  
    })
}) 

