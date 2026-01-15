const db = require('../db');

exports.matricular = (req, res) => {
  const { aluno_id, turma_id } = req.body;

  db.query(
    'INSERT INTO matriculas (aluno_id, turma_id) VALUES (?, ?)',
    [aluno_id, turma_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Matrícula realizada' });
    }
  );
};

exports.cancelar = (req, res) => {
  const { aluno_id, turma_id } = req.body;

  db.query(
    'DELETE FROM matriculas WHERE aluno_id=? AND turma_id=?',
    [aluno_id, turma_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Matrícula cancelada' });
    }
  );
};

exports.listarPorTurma = (req, res) => {
  db.query(
    `SELECT a.*
     FROM matriculas m
     JOIN alunos a ON a.id = m.aluno_id
     WHERE m.turma_id=?`,
    [req.params.turmaId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};

exports.listarPorAluno = (req, res) => {
  db.query(
    `SELECT t.*
     FROM matriculas m
     JOIN turmas t ON t.id = m.turma_id
     WHERE m.aluno_id=?`,
    [req.params.alunoId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results);
    }
  );
};
