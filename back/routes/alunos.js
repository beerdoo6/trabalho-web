const router = require('express').Router();
const db = require('../db');

// LISTAR ALUNOS
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM alunos');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// CADASTRAR ALUNO
router.post('/', async (req, res) => {
    try {
        const { nome, email } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ error: 'Dados incompletos' });
        }

        await db.query(
            'INSERT INTO alunos (nome, email) VALUES (?, ?)',
            [nome, email]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// EXCLUIR ALUNO
router.delete('/:id', async (req, res) => {
    try {
        await db.query(
            'DELETE FROM alunos WHERE id = ?',
            [req.params.id]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
