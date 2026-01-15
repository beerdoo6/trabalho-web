const db = require('../db');

exports.criar = (req, res) => {
  const { nome, email, telefone } = req.body;

  db.query(
    'INSERT INTO professores (nome, email, telefone) VALUES (?, ?, ?)',
    [nome, email, telefone],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Professor cadastrado' });
    }
  );
};

exports.listar = (req, res) => {
  db.query('SELECT * FROM professores', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  db.query(
    'SELECT * FROM professores WHERE id=?',
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json(results[0]);
    }
  );
};

exports.atualizar = (req, res) => {
  const { nome, email, telefone } = req.body;

  db.query(
    'UPDATE professores SET nome=?, email=?, telefone=? WHERE id=?',
    [nome, email, telefone, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Professor atualizado' });
    }
  );
};

exports.excluir = (req, res) => {
  db.query(
    'DELETE FROM professores WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Professor excluído' });
    }
  );
};
