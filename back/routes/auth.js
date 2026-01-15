const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');

const router = express.Router();
const SECRET = 'segredo123';

/* ================= CADASTRO ================= */
router.post('/register', async (req, res) => {
    const { email, senha, tipo } = req.body;

    if (!email || !senha || !tipo) {
        return res.status(400).json({ error: 'Campos obrigatórios' });
    }

    db.query(
        'SELECT id FROM usuarios WHERE email = ?',
        [email],
        async (err, r) => {
            if (err) return res.status(500).json({ error: err.message });
            if (r.length > 0) return res.status(400).json({ error: 'Usuário já existe' });

            const hash = await bcrypt.hash(senha, 10);

            db.query(
                'INSERT INTO usuarios (email, senha, tipo) VALUES (?, ?, ?)',
                [email, hash, tipo],
                (err, result) => {
                    if (err) return res.status(500).json({ error: err.message });

                    const id = result.insertId;

                    if (tipo === 'aluno') {
                        db.query('INSERT INTO alunos (nome, curso, usuario_id) VALUES (?, ?, ?)',
                            ['Novo Aluno', '', id]);
                    }

                    if (tipo === 'professor') {
                        db.query('INSERT INTO professores (nome, area, usuario_id) VALUES (?, ?, ?)',
                            ['Novo Professor', '', id]);
                    }

                    res.json({ message: 'Cadastro realizado' });
                }
            );
        }
    );
});

/* ================= LOGIN ================= */
router.post('/login', (req, res) => {
    const { email, senha } = req.body;

    db.query(
        'SELECT * FROM usuarios WHERE email = ?',
        [email],
        async (err, r) => {
            if (err) return res.status(500).json({ error: err.message });
            if (r.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });

            const usuario = r[0];
            const ok = await bcrypt.compare(senha, usuario.senha);
            if (!ok) return res.status(401).json({ error: 'Senha incorreta' });

            const token = jwt.sign(
                { id: usuario.id, tipo: usuario.tipo },
                SECRET,
                { expiresIn: '2h' }
            );

            res.json({ token, tipo: usuario.tipo });
        }
    );
});

module.exports = router;
