const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET = 'segredo123';

// MIDDLEWARE ADMIN
function adminOnly(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET, (err, user) => {
        if (err || user.tipo !== 'admin') return res.sendStatus(403);
        next();
    });
}

// LISTAR USUÁRIOS
router.get('/usuarios', adminOnly, (req, res) => {
    db.query(
        'SELECT id, email, tipo FROM usuarios',
        (err, r) => {
            if (err) return res.status(500).json(err);
            res.json(r);
        }
    );
});

// EXCLUIR USUÁRIO
router.delete('/usuarios/:id', adminOnly, (req, res) => {
    db.query(
        'DELETE FROM usuarios WHERE id = ?',
        [req.params.id],
        err => {
            if (err) return res.status(500).json(err);
            res.sendStatus(204);
        }
    );
});

module.exports = router;
