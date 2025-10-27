# API de Gestão de Gastos Domésticos

Uma API Rest completa para gerenciar gastos domésticos mensais, incluindo despesas fixas, variáveis, receitas e controle de pagamentos.

## 📋 Funcionalidades

- **Gestão de Usuários**: Registro, login e autenticação JWT
- **Despesas Fixas**: CRUD completo para despesas fixas mensais
- **Despesas Variáveis**: CRUD completo para despesas variáveis
- **Receitas**: Controle de receitas por usuário
- **Pagamentos**: Processamento de pagamentos com dedução automática da receita
- **Relatórios**: Resumos financeiros e estatísticas
- **Documentação**: Swagger UI integrado

## 🚀 Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **JWT** - Autenticação por token
- **bcryptjs** - Criptografia de senhas
- **Swagger** - Documentação da API
- **UUID** - Geração de IDs únicos

## 📁 Estrutura do Projeto

```
src/
├── config/
│   └── database.js          # Banco de dados em memória
├── controllers/
│   ├── UserController.js    # Controle de usuários
│   ├── ExpenseController.js # Controle de despesas
│   ├── RevenueController.js # Controle de receitas
│   └── PaymentController.js # Controle de pagamentos
├── middleware/
│   ├── auth.js             # Middleware de autenticação JWT
│   └── validation.js       # Validações de dados
├── models/
│   ├── User.js             # Modelo de usuário
│   ├── FixedExpense.js     # Modelo de despesa fixa
│   ├── VariableExpense.js  # Modelo de despesa variável
│   ├── Revenue.js          # Modelo de receita
│   └── Payment.js          # Modelo de pagamento
├── routes/
│   ├── userRoutes.js       # Rotas de usuários
│   ├── expenseRoutes.js    # Rotas de despesas
│   ├── revenueRoutes.js    # Rotas de receitas
│   ├── paymentRoutes.js    # Rotas de pagamentos
│   └── index.js            # Configuração das rotas
├── services/
│   ├── UserService.js      # Lógica de negócio de usuários
│   ├── ExpenseService.js   # Lógica de negócio de despesas
│   ├── RevenueService.js   # Lógica de negócio de receitas
│   └── PaymentService.js   # Lógica de negócio de pagamentos
└── server.js               # Servidor principal

resources/
└── swagger.json            # Documentação Swagger
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd ppp-gestao-gastos-domesticos-api
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor:
```bash
# Desenvolvimento
npm run dev

# Produção
npm start
```

O servidor estará disponível em `http://localhost:3000`

## 📚 Documentação da API

A documentação completa da API está disponível através do Swagger UI:

- **URL**: `http://localhost:3000/api-docs`
- **Formato**: Swagger/OpenAPI 3.0

## 🔗 Endpoints Principais

### Autenticação
- `POST /api/users/register` - Registrar usuário
- `POST /api/users/login` - Fazer login
- `GET /api/users/profile` - Obter perfil (autenticado)

### Despesas Fixas
- `POST /api/expenses/fixed` - Criar despesa fixa (autenticado)
- `GET /api/expenses/fixed` - Listar despesas fixas
- `GET /api/expenses/fixed/:id` - Obter despesa fixa por ID
- `PUT /api/expenses/fixed/:id` - Atualizar despesa fixa (autenticado)
- `DELETE /api/expenses/fixed/:id` - Deletar despesa fixa (autenticado)

### Despesas Variáveis
- `POST /api/expenses/variable` - Criar despesa variável (autenticado)
- `GET /api/expenses/variable` - Listar despesas variáveis
- `GET /api/expenses/variable/:id` - Obter despesa variável por ID
- `PUT /api/expenses/variable/:id` - Atualizar despesa variável (autenticado)
- `DELETE /api/expenses/variable/:id` - Deletar despesa variável (autenticado)

### Receitas
- `POST /api/revenues` - Criar receita (autenticado)
- `GET /api/revenues` - Obter receita do usuário (autenticado)
- `PUT /api/revenues` - Atualizar receita (autenticado)
- `DELETE /api/revenues` - Deletar receita (autenticado)

### Pagamentos
- `POST /api/expenses/payment` - Processar pagamento (autenticado)
- `GET /api/payments` - Listar pagamentos
- `GET /api/payments/summary` - Resumo de pagamentos

### Relatórios
- `GET /api/expenses/summary` - Resumo financeiro completo

## 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação. Para acessar endpoints protegidos:

1. Faça login em `/api/users/login`
2. Use o token retornado no header `Authorization: Bearer <token>`

## 💡 Exemplos de Uso

### 1. Registrar usuário e fazer login

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com",
    "password": "123456"
  }'

# Fazer login
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com",
    "password": "123456"
  }'
```

### 2. Criar despesas fixas

```bash
curl -X POST http://localhost:3000/api/expenses/fixed \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "name": "Carro",
    "value": 1000.00,
    "status": "Pendente"
  }'
```

### 3. Registrar receita

```bash
curl -X POST http://localhost:3000/api/revenues \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "currentValue": 2000.00,
    "previousValue": 4000.00
  }'
```

### 4. Processar pagamento

```bash
curl -X POST http://localhost:3000/api/expenses/payment \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <seu-token>" \
  -d '{
    "expenseId": "id-da-despesa",
    "expenseType": "fixed",
    "amount": 500.00,
    "description": "Pagamento parcial"
  }'
```

### 5. Obter resumo financeiro

```bash
curl -X GET http://localhost:3000/api/expenses/summary
```

## 📊 Estrutura de Dados

### Despesa Fixa
```json
{
  "id": "uuid",
  "name": "Carro",
  "value": 1000.00,
  "status": "Pendente",
  "paidValue": 0,
  "remainingValue": 1000.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Receita
```json
{
  "id": "uuid",
  "userId": "uuid",
  "currentValue": 2000.00,
  "previousValue": 4000.00,
  "usedValue": 0,
  "availableValue": 2000.00,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Resumo Financeiro
```json
{
  "fixedExpenses": {
    "total": 9000.00,
    "paid": 5000.00,
    "remaining": 4000.00
  },
  "variableExpenses": {
    "total": 2000.00,
    "paid": 1000.00,
    "remaining": 1000.00
  },
  "totalExpenses": 11000.00,
  "totalPaid": 6000.00,
  "totalToPay": 5000.00,
  "totalRevenue": 2000.00,
  "finalSituation": -9000.00
}
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.
