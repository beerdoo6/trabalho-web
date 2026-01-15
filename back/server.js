const express = require('express');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
require('./db');

const app = express();

app.use(cors());
app.use(express.json());

// Servir frontend
app.use(express.static(path.join(__dirname, '../front')));

// Rotas de autenticação
app.use('/api/auth', authRoutes);

// Teste
app.get('/api/teste', (req, res) => {
    res.json({ ok: true });
});

// Servidor
app.listen(3000, () => {
    console.log(' Backend rodando em http://localhost:3000');
    console.log(' MySQL conectado');
});
