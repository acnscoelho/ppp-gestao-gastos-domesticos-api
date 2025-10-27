const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../resources/swagger.json');

// Importar rotas
const routes = require('./routes');

// Configurar aplicação
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares de segurança
app.use(helmet());
app.use(cors());

// Middleware para parsing de JSON
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging (opcional)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Configurar Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API Gestão de Gastos Domésticos'
}));

// Rota raiz
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API de Gestão de Gastos Domésticos',
        version: '1.0.0',
        documentation: '/api-docs',
        endpoints: {
            health: '/api/health',
            users: '/api/users',
            expenses: '/api/expenses',
            revenues: '/api/revenues',
            payments: '/api/payments'
        }
    });
});

// Configurar rotas da API
app.use('/api', routes);

// Middleware de tratamento de erros 404
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint não encontrado',
        error: 'NOT_FOUND',
        path: req.originalUrl
    });
});

// Middleware global de tratamento de erros
app.use((error, req, res, next) => {
    console.error('Erro não tratado:', error);
    
    res.status(error.status || 500).json({
        success: false,
        message: error.message || 'Erro interno do servidor',
        error: error.name || 'INTERNAL_ERROR',
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📚 Documentação disponível em: http://localhost:${PORT}/api-docs`);
    console.log(`🔍 Health check em: http://localhost:${PORT}/api/health`);
    console.log(`📊 API base URL: http://localhost:${PORT}/api`);
});

module.exports = app;
