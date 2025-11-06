const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()

describe('Payments - GET /payments', () => {
    let usuarioCriado = {
        name: '',
        email: '',
        password: '123456',
        token: ''
    };

    let despesaCriada = {
        id: ''
    };

    let pagamentoId = '';

    before(async () => {
        const timestamp = Date.now();
        usuarioCriado.name = `UserPaymentList${timestamp}`;
        usuarioCriado.email = `paymentlist${timestamp}@gmail.com`;

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
                'currentValue': 10000,
                'previousValue': 0
            });

       
        const respostaDespesa = await request(process.env.BASE_URL)
            .post('/expenses/fixed')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                'name': 'Aluguel',
                'value': 1500
            });

        despesaCriada.id = respostaDespesa.body.data.id;

       
        const respostaPagamento = await request(process.env.BASE_URL)
            .post('/expenses/payment')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
            .set('Content-Type', 'application/json')
            .send({
                "expenseId": despesaCriada.id,
                "expenseType": "fixed",
                "amount": 1500
            });

        pagamentoId = respostaPagamento.body.data.id;
    });

    describe('GET /payments', () => {
        it('Deve retornar 200 e exibir todos os pagamentos do usuário autenticado', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/payments')
                .set('Authorization', `Bearer ${usuarioCriado.token}`)

            expect(resposta.status).to.equal(200);
            expect(resposta.body.data).to.be.an('array');
            expect(resposta.body.data.length).to.be.greaterThan(0);
            
           
            const pagamento = resposta.body.data[0];
            expect(pagamento).to.have.property('id');
            expect(pagamento).to.have.property('expenseId');
            expect(pagamento).to.have.property('expenseType');
            expect(pagamento).to.have.property('amount');
            expect(pagamento).to.have.property('userId');
        })
    })

    after(async () => {
        await request(process.env.BASE_URL)
            .delete('/users/profile')
            .set('Authorization', `Bearer ${usuarioCriado.token}`)
    })
})