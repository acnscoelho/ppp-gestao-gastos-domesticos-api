const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config()
const { obterToken } = require('../helpers/autenticacao')


describe('Users /Register/Login/Profile', () => {

    let usuarioCriado = {
        name: '',
        email: '',
        password: '123456',
        token: ''
    };

    let timestamp = Date.now();

    describe('POST /users/register', async () => {
        it('Deve retornar 201 com um token em string quando usar dados válidos para cadastrar um usuário', async () => {
            
            usuarioCriado.name = `AnaCoelho${timestamp}`;
            usuarioCriado.email = `anacoelho${timestamp}@gmail.com`;

            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'name': usuarioCriado.name,
                    'email': usuarioCriado.email,
                    'password': usuarioCriado.password
                })
            expect(resposta.status).to.equal(201);
            expect(resposta.body.data.token).to.be.a('string');  
            expect(resposta.body.message).to.equal('Usuário criado com sucesso');

            usuarioCriado.token = resposta.body.data.token;
        })

        it('Deve retornar 400 quando tentar registrar com email já existente', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'name': usuarioCriado.name,
                    'email': usuarioCriado.email,
                    'password': usuarioCriado.password
                })
            expect(resposta.status).to.equal(400);
            expect(resposta.body.message).to.equal('Email já está em uso');
        })

        it('Deve retornar 400 quando tentar registrar com campos obrigatórios ausentes', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'name': usuarioCriado.name
                })
            expect(resposta.status).to.equal(400);
            expect(resposta.body.message).to.equal('Campos obrigatórios: email, password');
        })

        it('Deve retornar 400 quando tentar registrar com senha menor que 6 caracteres', async () => {

            const resposta = await request(process.env.BASE_URL)
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'name': `AnaCoelho${timestamp}`,
                    'email': `anacoelho${timestamp}@gmail.com`,
                    'password': '12345'
                })
            expect(resposta.status).to.equal(400);
            expect(resposta.body.message).to.equal('Senha deve ter pelo menos 6 caracteres');
        })
        
    })


    describe('POST /users/login', async () => {
        it('Deve retornar 200 quando o usuário realizar o login com credenciais válidas', async () => {
            const respostaLogin = await obterToken(usuarioCriado.email, usuarioCriado.password)

            expect(respostaLogin.status).to.equal(200);
            expect(respostaLogin.body.message).to.equal('Login realizado com sucesso');
        })

        it('Deve retornar 401 quando o usuário realizar o login com senha incorreta', async () => {
            const respostaLogin = await obterToken(usuarioCriado.email, '654321')

            expect(respostaLogin.status).to.equal(401);
            expect(respostaLogin.body.message).to.equal('Credenciais inválidas');
        })

        it('Deve retornar 401 quando o usuário realizar o login com email inexistente', async () => {
            const respostaLogin = await obterToken('email_inexistente@gmail.com', usuarioCriado.password)

            expect(respostaLogin.status).to.equal(401);
            expect(respostaLogin.body.message).to.equal('Credenciais inválidas');
        })
    })

    describe('DELETE /users/profile', async () => {
        it('Deve retornar 200 quando a conta do usuário for excluída', async () => {
            const respostaDelete = await request(process.env.BASE_URL)
                .delete('/users/profile')
                .set('Authorization', `Bearer ${usuarioCriado.token}`)

            expect(respostaDelete.status).to.equal(200);
            expect(respostaDelete.body.message).to.equal('Usuário deletado com sucesso');
        })
    })
})