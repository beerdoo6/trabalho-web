const db = require('../db');

exports.criar = (req, res) => {
  const { disciplina_id, professor_id, semestre } = req.body;

  db.query(
    `INSERT INTO turmas (disciplina_id, professor_id, semestre)
     VALUES (?, ?, ?)`,
    [disciplina_id, professor_id, semestre],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Turma cadastrada' });
    }
  );
};

exports.listar = (req, res) => {
  db.query('SELECT * FROM turmas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  db.query(
    'SELECT * FROM turmas WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
};

exports.atualizar = (req, res) => {
  const { professor_id, semestre } = req.body;

  db.query(
    'UPDATE turmas SET professor_id=?, semestre=? WHERE id=?',
    [professor_id, semestre, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Turma atualizada' });
    }
  );
};

exports.excluir = (req, res) => {
  db.query(
    'DELETE FROM turmas WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Turma excluída' });
    }
  );
};
