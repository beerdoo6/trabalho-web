const db = require('../db');

exports.criar = (req, res) => {
  const { nome } = req.body;

  db.query(
    'INSERT INTO cursos (nome) VALUES (?)',
    [nome],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Curso cadastrado' });
    }
  );
};

exports.listar = (req, res) => {
  db.query('SELECT * FROM cursos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  db.query(
    'SELECT * FROM cursos WHERE id=?',
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
    'UPDATE cursos SET nome=? WHERE id=?',
    [nome, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Curso atualizado' });
    }
  );
};

exports.excluir = (req, res) => {
  db.query(
    'DELETE FROM cursos WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Curso excluído' });
    }
  );
};
