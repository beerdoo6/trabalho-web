const db = require('../db');

exports.criar = (req, res) => {
  const { nome, curso_id } = req.body;

  db.query(
    'INSERT INTO disciplinas (nome, curso_id) VALUES (?, ?)',
    [nome, curso_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Disciplina cadastrada' });
    }
  );
};

exports.listar = (req, res) => {
  db.query('SELECT * FROM disciplinas', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  db.query(
    'SELECT * FROM disciplinas WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
};

exports.atualizar = (req, res) => {
  const { nome } = req.body;

  db.query(
    'UPDATE disciplinas SET nome=? WHERE id=?',
    [nome, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Disciplina atualizada' });
    }
  );
};

exports.excluir = (req, res) => {
  db.query(
    'DELETE FROM disciplinas WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Disciplina excluída' });
    }
  );
};
