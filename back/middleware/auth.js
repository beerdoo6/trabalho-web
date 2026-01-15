const jwt = require('jsonwebtoken');
const SECRET = 'segredo123';

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ error: 'Token não fornecido' });

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token inválido' });
  }
}

function apenasAdmin(req, res, next) {
  if (req.user.tipo !== 'admin')
    return res.status(403).json({ error: 'Acesso negado' });

  next();
}

module.exports = { auth, apenasAdmin, SECRET };
