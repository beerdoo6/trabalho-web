const db = require('../db');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  try {
    const senhaHash = await bcrypt.hash(senha, 10);

    db.query(
      'INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)',
      [nome, email, senhaHash, tipo],
      (err) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ message: 'Usuário registrado com sucesso' });
      }
    );
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.login = (req, res) => {
  const { email, senha } = req.body;

  db.query(
    'SELECT * FROM usuarios WHERE email = ?',
    [email],
    async (err, results) => {
      if (err) return res.status(500).json(err);
      if (results.length === 0)
        return res.status(401).json({ message: 'Usuário não encontrado' });

      const usuario = results[0];
      const senhaOk = await bcrypt.compare(senha, usuario.senha);

      if (!senhaOk)
        return res.status(401).json({ message: 'Senha inválida' });

      res.json({
        message: 'Login realizado com sucesso',
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          tipo: usuario.tipo
        }
      });
    }
  );
};
