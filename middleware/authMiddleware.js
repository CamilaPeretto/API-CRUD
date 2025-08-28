
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ msg: 'Token não fornecido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido ou expirado' });
  }
};

exports.checkAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ msg: 'Usuário não autenticado' });
  if (req.user.role !== 'admin') return res.status(403).json({ msg: 'Acesso negado. Admins apenas.' });
  next();
};
