const router = require('express').Router();
const db = require('../db');

// LISTAR PROFESSORES
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM professores');
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// ATRIBUIR PROFESSOR A TURMA E DISCIPLINA
router.post('/atribuir', async (req, res) => {
    try {
        const { professor_id, turma_id, disciplina_id } = req.body;

        if (!professor_id || !turma_id || !disciplina_id) {
            return res.status(400).json({ erro: 'Dados incompletos' });
        }

        await db.query(
            'INSERT INTO professor_turma (professor_id, turma_id, disciplina_id) VALUES (?,?,?)',
            [professor_id, turma_id, disciplina_id]
        );

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;
