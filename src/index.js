const express = require('express');
const app = express();
const PORT = 3000;

// Conexão com o banco de dados
const DBConnect = require('./database/connection');
DBConnect();

// Middleware para interpretar JSON
app.use(express.json());

// Rotas de autenticação
const autenticacaoRoutes = require('./routes/autenticacao.routes');
app.use(autenticacaoRoutes);

// Middleware para verificar token de autenticação
const { checkToken } = require('./validators/AutenticacaoValidator');

// Outras rotas protegidas pelo token de autenticação
const routes = require('./routes/routes');
app.use(checkToken, routes);

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Aplicação rodando na porta ${PORT}`);
});
