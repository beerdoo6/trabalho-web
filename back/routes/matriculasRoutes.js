const express = require('express');
const router = express.Router();
const matriculasController = require('../controllers/matriculasController');

router.post('/', matriculasController.matricular);             
router.delete('/', matriculasController.cancelar);             
router.get('/turma/:turmaId', matriculasController.listarPorTurma);
router.get('/aluno/:alunoId', matriculasController.listarPorAluno);

module.exports = router;
