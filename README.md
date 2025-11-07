# 💰 API de Gestão de Gastos Domésticos

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D%2018.0.0-brightgreen.svg)
![Tests](https://img.shields.io/badge/tests-passing-success.svg)
![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

**Uma API REST completa para gerenciar gastos domésticos mensais, incluindo despesas fixas, variáveis, receitas e controle de pagamentos.**

[Documentação (Wiki)](https://github.com/acnscoelho/ppp-gestao-gastos-domesticos-api/wiki) • [Swagger](http://localhost:3000/api-docs) • [Dashboard](http://localhost:3000/api/dashboard) • [Reportar Bug](https://github.com/acnscoelho/ppp-gestao-gastos-domesticos-api/issues)

</div>

---

## 📑 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Features](#-features)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Instalação](#-instalação)
- [Testes](#-testes)
- [Pipeline CI/CD](#-pipeline-cicd)
- [Monitoramento](#-monitoramento)
- [Documentação](#-documentação)
- [Exemplos de Uso](#-exemplos-de-uso)
- [Screenshots](#-screenshots)
- [Contribuindo](#-contribuindo)
- [Licença](#-licença)
- [Autor](#-autor)

---

## 🎯 Sobre o Projeto

Este projeto é uma **API REST** desenvolvida para gerenciar finanças domésticas, permitindo o controle completo de despesas fixas, despesas variáveis, receitas e pagamentos. A aplicação conta com autenticação JWT, dashboard visual interativo, documentação Swagger, testes automatizados e pipeline CI/CD.

### 🌟 Destaques

- ✅ **34+ User Stories** documentadas
- ✅ **7 Épicos** completos
- ✅ **85+ páginas** de documentação na Wiki
- ✅ **Estratégia VADER** - Testes exploratórios manuais
- ✅ **22 Testes Automatizados** (API)
- ✅ **Testes de Performance** (JMeter)
- ✅ **Pipeline CI/CD** com GitHub Actions
- ✅ **Monitoramento APM** com New Relic

---

## 🚀 Features

### 👤 Gerenciamento de Usuários
- [x] Registro de usuário com criptografia de senha
- [x] Login com autenticação JWT
- [x] Visualizar, atualizar e excluir perfil
- [x] Proteção de rotas com middleware de autenticação

### 💸 Despesas Fixas
- [x] CRUD completo (Create, Read, Update, Delete)
- [x] Controle de status (Pendente/Pago)
- [x] Cálculo automático de valor pago/restante
- [x] Listagem com filtros

### 🛒 Despesas Variáveis
- [x] CRUD completo
- [x] Controle de valores e status
- [x] Relatórios individuais

### 💰 Receitas
- [x] Cadastro e gerenciamento de receitas
- [x] Controle de valores (atual, anterior, usado, disponível)
- [x] Dedução automática ao processar pagamentos

### 💳 Pagamentos
- [x] Processamento de pagamentos
- [x] Dedução automática da receita
- [x] Atualização de status de despesas
- [x] Validação de receita suficiente
- [x] Histórico completo de pagamentos

### 📊 Dashboard & Relatórios
- [x] Interface visual com gráficos (Chart.js)
- [x] Distribuição de despesas (Pizza)
- [x] Status de pagamentos (Barra)
- [x] Tabela detalhada de despesas
- [x] Resumo financeiro completo
- [x] API JSON para dados do dashboard

---

## 🛠️ Tecnologias

### Backend
- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) **Node.js 18+**
- ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) **Express.js**
- ![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=json-web-tokens&logoColor=white) **JSON Web Token**
- ![Bcrypt](https://img.shields.io/badge/Bcrypt-338739?style=flat) **bcryptjs**

### Frontend (Dashboard)
- ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=flat) **EJS (Template Engine)**
- ![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white) **Bootstrap 5**
- ![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=flat&logo=chart.js&logoColor=white) **Chart.js**

### Documentação
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=flat&logo=swagger&logoColor=black) **Swagger/OpenAPI 3.0**

### Testes
- ![Mocha](https://img.shields.io/badge/Mocha-8D6748?style=flat&logo=mocha&logoColor=white) **Mocha**
- ![Chai](https://img.shields.io/badge/Chai-A30701?style=flat&logo=chai&logoColor=white) **Chai**
- ![Supertest](https://img.shields.io/badge/Supertest-07C160?style=flat) **Supertest**
- ![Mochawesome](https://img.shields.io/badge/Mochawesome-FF6B6B?style=flat) **Mochawesome (Reports)**
- ![JMeter](https://img.shields.io/badge/JMeter-D22128?style=flat&logo=apache-jmeter&logoColor=white) **Apache JMeter** (Performance)

### DevOps & Monitoramento
- ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white) **GitHub Actions**
- ![New Relic](https://img.shields.io/badge/New_Relic-008C99?style=flat&logo=new-relic&logoColor=white) **New Relic APM**

---

## 🏗️ Arquitetura

```
ppp-gestao-gastos-domesticos-api/
│
├── .github/
│   └── workflows/
│       └── ci-tests.yml              # Pipeline CI/CD
│
├── docs/
│   └── evidencias/
│       ├── Testes_Automatizados/     # Evidências de testes
│       ├── Teste_Performance/        # Evidências JMeter
│       ├── Pipeline/                 # Evidências CI/CD
│       └── screenshots/              # Screenshots do projeto
│
├── helpers/
│   └── autenticacao.js               # Helper de autenticação
│
├── public/
│   └── css/
│       └── dashboard.css             # Estilos do dashboard
│
├── resources/
│   └── swagger.json                  # Documentação OpenAPI
│
├── src/
│   ├── config/
│   │   └── database.js               # Banco de dados em memória
│   ├── controllers/
│   │   ├── UserController.js         # Lógica de usuários
│   │   ├── ExpenseController.js      # Lógica de despesas
│   │   ├── RevenueController.js      # Lógica de receitas
│   │   └── PaymentController.js      # Lógica de pagamentos
│   ├── middleware/
│   │   ├── auth.js                   # Middleware JWT
│   │   └── validation.js             # Validações
│   ├── models/
│   │   ├── User.js                   # Modelo de usuário
│   │   ├── FixedExpense.js           # Modelo de despesa fixa
│   │   ├── VariableExpense.js        # Modelo de despesa variável
│   │   ├── Revenue.js                # Modelo de receita
│   │   └── Payment.js                # Modelo de pagamento
│   ├── routes/
│   │   ├── userRoutes.js             # Rotas de usuários
│   │   ├── expenseRoutes.js          # Rotas de despesas
│   │   ├── revenueRoutes.js          # Rotas de receitas
│   │   ├── paymentRoutes.js          # Rotas de pagamentos
│   │   └── index.js                  # Configuração de rotas
│   ├── services/
│   │   ├── UserService.js            # Regras de negócio
│   │   ├── ExpenseService.js
│   │   ├── RevenueService.js
│   │   └── PaymentService.js
│   ├── views/
│   │   ├── dashboard.ejs             # Template do dashboard
│   │   └── error.ejs                 # Template de erro
│   └── server.js                     # Servidor principal
│
├── test/
│   ├── api/
│   │   ├── users.test.js             # Testes de usuários
│   │   ├── expenses.test.js          # Testes de despesas fixas
│   │   ├── expenses_variable.test.js # Testes de despesas variáveis
│   │   ├── revenues.test.js          # Testes de receitas
│   │   ├── payment.test.js           # Testes de pagamentos
│   │   └── payment_history.test.js   # Testes de histórico
│   └── performance/
│       ├── jmeter/
│       │   └── login-performance-test.jmx  # Plano de teste JMeter
│       ├── results/                  # Resultados dos testes
│       └── README.md                 # Documentação de performance
│
├── .env                              # Variáveis de ambiente
├── .gitignore
├── newrelic.js                       # Configuração New Relic
├── package.json
└── README.md
```

---

## 📦 Instalação

### Pré-requisitos

- **Node.js** 18.x ou superior
- **npm** ou **yarn**
- **Git**

### Passo a Passo

1️⃣ **Clone o repositório**
```bash
git clone https://github.com/acnscoelho/ppp-gestao-gastos-domesticos-api.git
cd ppp-gestao-gastos-domesticos-api
```

2️⃣ **Instale as dependências**
```bash
npm install
```

3️⃣ **Configure as variáveis de ambiente**

Crie um arquivo `.env` na raiz do projeto:
```env
PORT=3000
BASE_URL=http://localhost:3000/api
JWT_SECRET=seu_secret_jwt_aqui
NEW_RELIC_LICENSE_KEY=sua_license_key_aqui
NEW_RELIC_ACCOUNT_ID=sua_account_id_aqui
```

4️⃣ **Execute o servidor**
```bash
# Modo desenvolvimento
npm run dev

# Modo produção
npm start
```

5️⃣ **Acesse a aplicação**
- API: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api-docs`
- Dashboard: `http://localhost:3000/api/dashboard`

---

## 🧪 Testes

### Estratégia de Testes

O projeto utiliza uma **abordagem híbrida** de testes:

#### 🔍 **Testes Exploratórios (VADER)**
Testes manuais baseados na heurística **VADER** usando Postman e Swagger:
- **V**erbs - Testes de verbos HTTP
- **A**uthorization/Authentication - Validação de autenticação JWT
- **D**ata - Validação de dados e payloads
- **E**rrors - Tratamento de erros e edge cases
- **R**esponsiveness - Tempo de resposta

📚 **Documentação completa**: [Wiki - Plano de Testes VADER](https://github.com/acnscoelho/ppp-gestao-gastos-domesticos-api/wiki/Plano-e-Estratégia-de-Testes-Adaptada)

#### 🤖 **Testes Automatizados**

Casos de teste selecionados foram automatizados usando **Mocha + Chai + Supertest**:

```bash
# Executar todos os testes automatizados
npm test

# Executar com relatório Mochawesome
npm test -- --reporter mochawesome
```

**Cenários Automatizados:**

| Módulo | Cenários Automatizados | Status |
|--------|--------|--------|
| **Users** | 8 cenários | ✅ Passing |
| **Expenses Fixed** | 4 cenários | ✅ Passing |
| **Expenses Variable** | 3 cenários | ✅ Passing |
| **Revenues** | 4 cenários | ✅ Passing |
| **Payments** | 2 cenários | ✅ Passing |
| **Payment History** | 1 cenário | ✅ Passing |

**Total: 22 cenários automatizados** + Testes manuais exploratórios completos

### Testes de Performance (JMeter)

Testes de carga e performance para validar o comportamento da API sob estresse:

```bash
# Instalar JMeter (se necessário)
# Baixar de: https://jmeter.apache.org/download_jmeter.cgi

# Executar teste de performance
jmeter -n -t test/performance/jmeter/login-performance-test.jmx \
       -l test/performance/results/results.jtl \
       -e -o test/performance/results/html-report
```

#### Configuração do Teste de Login
- **Usuários Virtuais**: 50
- **Ramp-up Period**: 10 segundos
- **Loop Count**: 10 iterações
- **Total de Requisições**: 500

📊 **Resultados esperados**:
- Throughput: ~50 req/s
- Tempo médio de resposta: < 200ms
- Taxa de erro: 0%

Para mais detalhes, consulte: [`test/performance/README.md`](test/performance/README.md)

---

## 🔄 Pipeline CI/CD

O projeto utiliza **GitHub Actions** para automatizar testes e garantir qualidade:

### Workflow: CI Tests

📁 Arquivo: `.github/workflows/ci-tests.yml`

#### Jobs

**1️⃣ API Tests (Mocha)**
- ✅ Checkout do código
- ✅ Setup Node.js 18
- ✅ Instalação de dependências
- ✅ Iniciar servidor
- ✅ Executar testes automatizados
- ✅ Upload do relatório Mochawesome

**2️⃣ Performance Tests (JMeter)**
- ✅ Instalação do JMeter 5.6.3
- ✅ Criar usuário de teste
- ✅ Executar testes de carga
- ✅ Gerar relatório HTML
- ✅ Upload dos resultados

### Triggers

```yaml
on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
```

### Visualizar Resultados

1. Acesse a aba **Actions** no GitHub
2. Selecione o workflow **CI Tests**
3. Baixe os artefatos:
   - `mochawesome-report` (Testes API)
   - `jmeter-report` (Testes Performance)

---

## 📊 Monitoramento

### New Relic APM

A aplicação está integrada com **New Relic** para monitoramento em tempo real:

#### Métricas Monitoradas
- ✅ Tempo de resposta das requisições
- ✅ Taxa de erros
- ✅ Throughput (req/s)
- ✅ Transações mais lentas
- ✅ Consumo de memória e CPU
- ✅ Distribuição de chamadas por endpoint

#### Configuração

```javascript
// newrelic.js
exports.config = {
  app_name: ['API Gestão Gastos Domésticos'],
  license_key: process.env.NEW_RELIC_LICENSE_KEY,
  account_id: process.env.NEW_RELIC_ACCOUNT_ID,
  logging: {
    level: 'info'
  }
}
```

#### Acessar Dashboard
1. Faça login em: https://one.newrelic.com
2. Navegue até **APM & Services**
3. Selecione **API Gestão Gastos Domésticos**

---

## 📚 Documentação

### Swagger UI

Documentação interativa completa da API:

🔗 **URL**: http://localhost:3000/api-docs

#### Recursos do Swagger
- 📖 Descrição detalhada de cada endpoint
- 🔐 Autenticação integrada (Bearer Token)
- 🧪 Teste direto pela interface
- 📋 Schemas de request/response
- 📝 Exemplos práticos

### Wiki do Projeto

Documentação técnica completa com 85+ páginas:

🔗 **URL**: https://github.com/acnscoelho/ppp-gestao-gastos-domesticos-api/wiki

#### Conteúdo da Wiki
- ✅ **Requisitos** (Funcionais e Não Funcionais)
- ✅ **Épicos e User Stories** (34+ histórias)
- ✅ **Critérios de Aceite**
- ✅ **Plano de Testes** (Estratégia VADER)
- ✅ **Casos de Teste** (54+ cenários)
- ✅ **Testes Automatizados** (Evidências)
- ✅ **Testes de Performance** (Resultados JMeter)
- ✅ **Pipeline CI/CD** (Configuração e evidências)
- ✅ **Definition of Ready (DoR)**
- ✅ **Definition of Done (DoD)**
- ✅ **Histórico de Bugs**
- ✅ **Métricas de Qualidade**

---

## 💡 Exemplos de Uso

### 1. Registrar Usuário e Fazer Login

```bash
# Registrar novo usuário
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'

# Resposta
{
  "success": true,
  "message": "Usuário criado com sucesso",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}

# Fazer login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

### 2. Cadastrar Despesas

```bash
# Despesa fixa
curl -X POST http://localhost:3000/api/expenses/fixed \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "name": "Aluguel",
    "value": 1500.00
  }'

# Despesa variável
curl -X POST http://localhost:3000/api/expenses/variable \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "name": "Supermercado",
    "value": 350.00
  }'
```

### 3. Registrar Receita

```bash
curl -X POST http://localhost:3000/api/revenues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "currentValue": 5000.00,
    "previousValue": 4500.00
  }'
```

### 4. Processar Pagamento

```bash
curl -X POST http://localhost:3000/api/expenses/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN" \
  -d '{
    "expenseId": "id-da-despesa",
    "expenseType": "fixed",
    "amount": 1500.00,
    "description": "Pagamento do aluguel"
  }'
```

### 5. Consultar Resumo Financeiro

```bash
curl -X GET http://localhost:3000/api/expenses/summary \
  -H "Authorization: Bearer SEU_TOKEN"

# Resposta
{
  "fixedExpenses": {
    "total": 3000.00,
    "paid": 1500.00,
    "remaining": 1500.00
  },
  "variableExpenses": {
    "total": 800.00,
    "paid": 350.00,
    "remaining": 450.00
  },
  "totalExpenses": 3800.00,
  "totalPaid": 1850.00,
  "totalToPay": 1950.00,
  "totalRevenue": 5000.00,
  "finalSituation": 3150.00
}
```

### 6. Acessar Dashboard Visual

```bash
# Abrir no navegador
http://localhost:3000/api/dashboard

# Ou obter dados JSON
curl -X GET http://localhost:3000/api/dashboard/data
```

---

## 📸 Screenshots

### Dashboard Financeiro

![Dashboard](docs/evidencias/screenshots/dashboard.jpg)

*Dashboard interativo com gráficos de distribuição de despesas, status de pagamentos e tabela detalhada.*

### Documentação Swagger

![Swagger](docs/evidencias/screenshots/swagger.jpg)

*Interface Swagger com todos os endpoints documentados e testáveis.*

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)** para proteger rotas sensíveis.

### Como Autenticar

1. **Faça login** em `/api/users/login`
2. **Copie o token** da resposta
3. **Use o token** no header das próximas requisições:

```bash
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Rotas Públicas
- `POST /api/users/register`
- `POST /api/users/login`
- `GET /api/health`

### Rotas Protegidas (requerem autenticação)
- Todas as rotas de perfil (`/api/users/profile`)
- Criação, atualização e exclusão de despesas
- Gerenciamento de receitas
- Processamento de pagamentos

---

## 🔗 Endpoints Principais

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| **Health** |
| `GET` | `/health` | Status da API | ❌ |
| **Users** |
| `POST` | `/users/register` | Registrar usuário | ❌ |
| `POST` | `/users/login` | Fazer login | ❌ |
| `GET` | `/users/profile` | Ver perfil | ✅ |
| `PUT` | `/users/profile` | Atualizar perfil | ✅ |
| `DELETE` | `/users/profile` | Excluir conta | ✅ |
| **Fixed Expenses** |
| `POST` | `/expenses/fixed` | Criar despesa fixa | ✅ |
| `GET` | `/expenses/fixed` | Listar despesas fixas | ❌ |
| `GET` | `/expenses/fixed/:id` | Buscar por ID | ❌ |
| `PUT` | `/expenses/fixed/:id` | Atualizar despesa | ✅ |
| `DELETE` | `/expenses/fixed/:id` | Excluir despesa | ✅ |
| **Variable Expenses** |
| `POST` | `/expenses/variable` | Criar despesa variável | ✅ |
| `GET` | `/expenses/variable` | Listar despesas variáveis | ❌ |
| `GET` | `/expenses/variable/:id` | Buscar por ID | ❌ |
| `PUT` | `/expenses/variable/:id` | Atualizar despesa | ✅ |
| `DELETE` | `/expenses/variable/:id` | Excluir despesa | ✅ |
| **Revenues** |
| `POST` | `/revenues` | Criar receita | ✅ |
| `GET` | `/revenues` | Ver receita | ✅ |
| `PUT` | `/revenues` | Atualizar receita | ✅ |
| `DELETE` | `/revenues` | Excluir receita | ✅ |
| **Payments** |
| `POST` | `/expenses/payment` | Processar pagamento | ✅ |
| `GET` | `/payments` | Listar pagamentos | ❌ |
| `GET` | `/payments/summary` | Resumo de pagamentos | ❌ |
| **Reports** |
| `GET` | `/expenses/summary` | Resumo financeiro | ❌ |
| **Dashboard** |
| `GET` | `/dashboard` | Interface visual | ❌ |
| `GET` | `/dashboard/data` | Dados em JSON | ❌ |

---

## 📊 Estrutura de Dados

### User
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "hash_bcrypt",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

### Fixed Expense
```json
{
  "id": "uuid",
  "userId": "uuid",
  "name": "Aluguel",
  "value": 1500.00,
  "status": "Pendente",
  "paidValue": 0,
  "remainingValue": 1500.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Revenue
```json
{
  "id": "uuid",
  "userId": "uuid",
  "currentValue": 5000.00,
  "previousValue": 4500.00,
  "usedValue": 1850.00,
  "availableValue": 3150.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Payment
```json
{
  "id": "uuid",
  "userId": "uuid",
  "expenseId": "uuid",
  "expenseType": "fixed",
  "amount": 1500.00,
  "description": "Pagamento do aluguel",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Padrões de Commit

```
feat: Nova funcionalidade
fix: Correção de bug
docs: Atualização de documentação
test: Adição ou correção de testes
refactor: Refatoração de código
style: Formatação de código
ci: Alterações no CI/CD
```

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais informações.

---

## 👩‍💻 Autor

<div align="center">

**Ana Cláudia Coelho**

[![GitHub](https://img.shields.io/badge/GitHub-acnscoelho-181717?style=flat&logo=github)](https://github.com/acnscoelho)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Ana_Cláudia_Coelho-0A66C2?style=flat&logo=linkedin)](https://linkedin.com/in/seu-perfil)

---

🌸 **Projeto desenvolvido durante a Mentoria 2.0 de Júlio de Lima**

[![Mentoria](https://img.shields.io/badge/Mentoria-QA_Júlio_de_Lima-FF6B6B?style=flat)](https://juliode-lima.com)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!

**[⬆ Voltar ao topo](#-api-de-gestão-de-gastos-domésticos)**

</div>
