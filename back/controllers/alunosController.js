const db = require('../db');

exports.criar = (req, res) => {
  const { nome, cpf, email, telefone, data_nascimento, curso_id } = req.body;

  db.query(
    `INSERT INTO alunos (nome, cpf, email, telefone, data_nascimento, curso_id)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [nome, cpf, email, telefone, data_nascimento, curso_id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: 'Aluno cadastrado com sucesso' });
    }
  );
};

exports.listar = (req, res) => {
  db.query('SELECT * FROM alunos', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.buscarPorId = (req, res) => {
  db.query(
    'SELECT * FROM alunos WHERE id = ?',
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
    'UPDATE alunos SET nome=?, email=?, telefone=? WHERE id=?',
    [nome, email, telefone, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Aluno atualizado' });
    }
  );
};

exports.excluir = (req, res) => {
  db.query(
    'DELETE FROM alunos WHERE id=?',
    [req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Aluno excluído' });
    }
  );
};
